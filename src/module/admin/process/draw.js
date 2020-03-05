/**
 * draw.js of pipeline
 * Created by beica on 2020/1/15
 */
import * as R from 'ramda'
import P from 'paper'

const arrowLength = 50

const lineHeight = 30

const strokeColor = new P.Color('white')

let row = 1

const init = cv => {
  cv.height = 50
  P.setup(cv)
}

const drawTitle = title => {
  new P.PointText({
    point: [10, lineHeight],
    content: title,
    fontSize: 16,
    fontWeight: 'bold',
    fillColor: strokeColor
  })
}

const getStartPos = gp => {
  let x = 0
  let y = 0
  const pre = gp.lastChild
  if (pre) {
    const bounds = pre.bounds
    x = bounds.right + arrowLength
    y = bounds.y
  }
  return {x, y}
}

const drawGroup = R.curry((gp, groups) => {
  const group = new P.Group()
  const { x, y } = getStartPos(gp)
  const rect = new P.Rectangle(new P.Point(x, y), new P.Size(100, 30))
  const path = new P.Path.Rectangle(rect, new P.Size(4, 4))
  path.strokeColor = strokeColor
  const text = new P.PointText({
    content: groups[0].name,
    fillColor: strokeColor
  })
  text.fitBounds(rect.scale(0.5))
  group.addChild(text)
  group.addChild(path)
  gp.addChild(group)
})

const getArrowRight = (start, end) => {
  const arrow = new P.Path([
    start,
    end.add([-4, 0]),
    end.add([-12, -4])
  ])
  arrow.strokeWidth = 2
  arrow.strokeColor = strokeColor
  return arrow
}

const link = gp => {
  const getPoints = [R.path(['bounds', 'rightCenter']), R.path(['bounds', 'leftCenter'])]
  const process = R.apply(R.useWith(getArrowRight, getPoints))
  const arrows = R.map(process, R.aperture(2, gp.children))
  const group = new P.Group(arrows)
  gp.addChild(group)
}

const drawProcess = config => {
  const gp = new P.Group()
  const draw = drawGroup(gp)
  
  R.map(draw, config)
  
  link(gp)
  
  const delta = new P.Point([10, (row + 1) * lineHeight])
  gp.translate(delta)
}

/**
 * draw process diagram
 * @param cv {HTMLCanvasElement}
 * @param config {[Object]}
 */
export default (cv, { name, phases }) => {
  init(cv)
  drawTitle(name)
  drawProcess(phases)
}
