/**
 * draw.edit.js of pipeline
 * Created by beica on 2020/1/15
 */
import * as R from 'ramda'
import P from 'paper'
import { colors, radius } from './draw.common'
import drawGroup from './draw.group'
import drawDropBox from './draw.dropbox'
import { reset, push, remove, getValue as _getValue } from './process.model'

const select = R.o(R.apply(push), R.props(['phase', 'data']))

const deselect = R.o(R.apply(remove), R.props(['phase', 'data']))

const move  = ({ data, from, to }) => {
  remove(from, data)
  push(to, data)
}

const events = { select, deselect, move }

const init = cv => {
  reset()
  P.setup(cv)
}

const drawGroups = (outline, groups) => {
  const gp = new P.Group()
  
  const dragAndModify = config => {
    const position = R.pathOr(new P.Point(0, 0), ['lastChild', 'bounds', 'topRight'], gp)
    
    const group = drawGroup(position, config)
    
    if (!group.isInside(outline)) { // wrap groups
      const { bottom, size, height } = group.bounds
      group.bounds.set(new P.Point(10, bottom + 10), size)
      outline.size = outline.size.add([0, height + 10])
    }
    
    group.on(events)
    
    gp.addChild(group)
  }
  
  R.map(dragAndModify, groups)
  gp.translate(new P.Point(0, 10))
  return gp
}

const drawSelectArea = groupsData => {
  const { width } = P.view.bounds
  const position = new P.Point(0, 0)
  const size = new P.Size(width - 20, 50)
  const rect = new P.Rectangle(position, size)
  const picker = new P.Path.Rectangle(rect, radius)
  picker.strokeColor = colors.whiteBg
  picker.dashArray = [8, 6]
  
  const groups = drawGroups(picker.bounds, groupsData)
  const gp = new P.Group([picker, groups])
  gp.name = 'picker'
  gp.translate(new P.Point(10, 10))
}

const addPhase = (gp, phase) => {
  const group = new P.Group()
  
  // draw title
  const title = new P.PointText({
    content: `阶段${phase}`,
    fillColor: colors.white,
    point: [0, -5]
  })
  
  const box = drawDropBox(phase)
  
  box.on({
    append: e => {
      addPhase(gp, e.phase + 1)
    }
  })
  
  // org els
  group.addChild(title)
  group.addChild(box)

  group.bounds.topLeft = R.pathOr(new P.Point(0, 0), ['lastChild', 'bounds', 'topRight'], gp).add(new P.Point(30, 0))
  
  gp.addChild(group)
  
  if (!box.isInside(P.view.bounds)) { // wrap drop-boxes
    const { height, y } = group.bounds
    group.bounds.topLeft = new P.Point(10, y + height + 10)
    if (!box.isInside(P.view.bounds)) {
      P.view.viewSize = P.view.viewSize.add(new P.Size(0, height))
    }
  }
  
  return box
}

const drawDropArea = () => {
  const gp = new P.Group()
  gp.name = 'drop'
  
  addPhase(gp, 1)
  
  const pickerBounds = P.project.activeLayer.children['picker'].bounds
  
  const offset = new P.Point(-30, 40)
  
  gp.translate(pickerBounds.bottomLeft.add(offset))
  gp.sendToBack()
}

/**
 * draw process edit page
 * @param cv {HTMLCanvasElement}
 * @param data {Object}
 * @param done {Function}
 */
export const draw = (cv, data, done) => {
  init(cv)
  
  drawSelectArea(data)
  drawDropArea()
}

export const getValue = _getValue
