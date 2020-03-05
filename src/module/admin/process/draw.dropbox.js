/**
 * draw.phase.js of pipeline
 * Created by beica on 2020/1/20
 */
import P from "paper"
import { colors, get, set, radius } from './draw.common'

export default phase => {
  const position = new P.Point(0, 0)
  const size = new P.Size(150, 120)
  // draw container
  const rect = new P.Rectangle(position, size)
  const box = new P.Path.Rectangle(rect, radius)
  box.fillColor = colors.lightBg
  
  // event handler
  box.onMouseEnter = function () {
    if (get('dragging')) {
      set([
        ['ondrop', true],
        ['phase', phase]
      ])
      box.strokeColor = colors.blue
    }
  }
  
  box.onMouseLeave = function () {
    if (get('dragging')) {
      set('ondrop', false)
      box.strokeColor = colors.none
    }
  }
  
  let dropped = false
  box.onMouseUp = function () {
    const ondrop = get('ondrop')
    if(ondrop) {
      if (!dropped) {
        box.emit('append', { phase })
        box.fillColor = colors.whiteBg
        dropped = true
      }
    }
    box.strokeColor = colors.none
    set('ondrop', false)
  }
  
  return box
}
