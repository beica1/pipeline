/**
 * draw.common.js of pipeline
 * Created by beica on 2020/1/17
 */
import P from 'paper'
import { createStore } from 'utils/store'

export const { get, set } = createStore()

const blue = new P.Color('#1e90ff')
const white = new P.Color('white')

export const radius = new P.Size(4, 4)

export const colors = {
  blue,
  get blueBg () {
    const color = blue.clone()
    color.alpha = 0.2
    return color
  },
  white,
  get whiteBg () {
    const color = white.clone()
    color.alpha = 0.3
    return color
  },
  get lightBg () {
    const color = white.clone()
    color.alpha = 0.1
    return color
  },
  none: new P.Color('transparent')
}

export const drawButton = ({ content, position }) => {
  const group = new P.Group()
  const react = new P.Rectangle(position, new P.Size(120, 30))
  const outline = new P.Shape.Rectangle(react, new P.Size(4, 4))
  outline.fillColor = new P.Color('#1e90ff')
  const text = new P.PointText({
    content,
    fillColor: colors.white
  })
  text.fitBounds(react.scale(0.5))
  group.addChild(outline)
  group.addChild(text)
  return group
}

export const drawArrowRight = () => {}
