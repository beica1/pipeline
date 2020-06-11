/**
 * @description task.ds.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/4/9>
 */
import * as R from 'ramda'
import * as Y from 'yup'
import { addDay } from 'utils/date'

const fileSchema = Y.object({
  fileId: Y.string(),
  fileName: Y.string()
}).nullable()

const tomorrow = addDay(1, new Date())

const testFileInput = arr => R.length(arr) ? arr[0] && arr[1] : true

/**
 * @type {Y}
 */
export const schema = Y.object({
  name: Y.string()
    .required('请输入活动名称')
  ,requirements: Y.array()
    .min(1, '请至少选择一种需求')
    .ensure()
  ,files: Y.array()
    .of(fileSchema)
    .min(2, '请上传需求文档，设计文稿')
    .test('top-2-is-real', '需求，设计稿为必需文件', testFileInput)
    .ensure()
  ,actors: Y.array()
    .min(1, '请至少选择一类参与者')
    .ensure()
  ,deliveryTime: Y.date()
    .typeError('日期格式错误')
    .min(tomorrow, '推广/活动项目最少开发时间不得小于1天')
    .max(addDay(14, new Date()), '推广/活动项目最长开发时间不得大于14天')
    .default(tomorrow)
  ,testTime: Y.number()
    .min(4, '测试时间不应小于4小时')
    .default(4)
  ,priority: Y.number().oneOf([0, 1, 2]).default(0)
  ,preview: Y.string()
    .required('请添加预览图片')
  ,process: Y.string()
    .required('请选择流程')
})
