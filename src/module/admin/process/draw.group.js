/**
 * draw.group.js of pipeline
 * Created by beica on 2020/1/20
 */
import P from 'paper'
import { colors, drawButton, get, set } from './draw.common'

export default (position, config) => {
  let select = false
  let selectedPhase = null
  let copy = null
  
  const group = drawButton({
    content: config.name,
    position: position.add(new P.Point(10, 0))
  })
  
  const clone = () => {
    copy = group.clone()
    copy.children[0].style = {
      fillColor: colors.none,
      strokeColor: colors.white
    }
  }
  
  const reset = () => {
    group.position = copy.position
    copy.remove()
    copy = null
  }
  
  const emitSelect = phase => {
    select = true
    group.emit('select', {
      target: group,
      phase,
      data: config
    })
  }
  
  const emitDeselect = phase => {
    select = false
    group.emit('deselect', {
      target: group,
      phase,
      data: config
    })
  }
  
  const emitMove = (from, to) => {
    group.emit('move', {
      target: group,
      from,
      to,
      data: config
    })
  }
  
  group.onMouseDown = () => {
    group.guide = true // event hack
    
    set([
      ['dragging', true],
      ['dragTarget', group]
    ])
    
    if (!select) {
      clone()
    }
  }
  
  group.onMouseDrag = e => {
    group.position = group.position.add(e.delta)
  }
  
  group.onMouseUp = () => {
    group.guide = false // event hack
    set('dragging', false)
    const [ondrop, phase] = get(['ondrop', 'phase'])
    if (ondrop) {
      if (!select) { // select
        emitSelect(phase)
        selectedPhase = phase
      } else if (selectedPhase !== phase) { // move select
        emitMove(selectedPhase, phase)
        selectedPhase = phase
      }
    } else {
      if (select) { // deselect
        emitDeselect(phase)
      }
      reset() // destroy copy
    }
  }
  
  return group
}
