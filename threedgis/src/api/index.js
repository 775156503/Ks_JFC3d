import { post_, get_ } from '@/utils/request2'

import qs from 'qs'
import axios from 'axios'
let urlDemo = true
let urlApi = 'http://58.219.32.1:922/qpBs'
// let baiduApi = 'https://api.map.baidu.com/place/v2'
urlDemo ? (urlApi = 'http://58.210.32.10:9022/qpBs') : (urlApi = 'api')
// urlDemo
//   ? (baiduApi = 'https://api.map.baidu.com/place/v2')
//   : (baiduApi = 'baiduApi')
export function getDataDemo() {
  return post_('api/getDemo')
}
//登录验证
export const getUserInfo = (params) => {
  console.log(params, 'params')
  return post_(`${urlApi}/user/login`, params)
}
export const getUserCode = () => {
  return get_(`${urlApi}/user/getUserInfo`)
}
// 百度地图
// export const getBaiduApi = (query) => {
//   return get_(
//     `${baiduApi}/search?query=${query}&region=昆山市&output=json&ak=DRA495273DCI0i5g6KxrEP9eM2NeolIt`
//   )
// }
export const getBaiduApi = (query) => {
  return get_(
    `https://api.map.baidu.com/place/v2/search?query=${query}&region=昆山市&output=json&ak=DRA495273DCI0i5g6KxrEP9eM2NeolIt`
  )
}
// 大数据面板
export const getBigData = () => {
  return get_(`${urlApi}/bigData/getBigData`)
}
/* 树结构1:测绘 */
// 测绘树结构
export const getSgTree = () => {
  return get_(`${urlApi}/probeInfo/getEngineeringInfo`)
}
// 按工程名获取单个
export const getSg = (tag) => {
  return get_(`${urlApi}/probeInfo/getProbePipelineInfo?tag=${tag}`)
}
/* 树结构2:检测 */
export const getJcTree = () => {
  return get_(`${urlApi}/detectionInfo/getDetectionInfo2`)
}
export const getJc = (eId) => {
  return get_(`${urlApi}/detectionInfo/getDetectionInfo?eId=${eId}`)
}
/* 树结构3:修复 */
export const getXfTree = () => {
  return get_(`${urlApi}/repairInfo/getRepairInfo2`)
}
export const getXf = (eId) => {
  return get_(`${urlApi}/repairInfo/getRepairInfo?eId=${eId}`)
}
// 水管服务--传参版
export const getSgServer = (
  upperCaliber,
  leftTopX,
  leftTopY,
  rightBottomX,
  rightBottomY
) => {
  return get_(
    `${urlApi}/probeInfo/getProbePipelineInfo?upperCaliber=${upperCaliber}&leftTopX=${leftTopX}&leftTopY=${leftTopY}&rightBottomX=${rightBottomX}&rightBottomY=${rightBottomY}`
  )
}
// 排查区域--搜索
export const searchTroubleArea = (search, status, companyName) => {
  return get_(
    `${urlApi}/troubleShoot/getTroubleAreas?search=${search}&status=${status}&companyName=${companyName}`
  )
}
// 排查区域--获取全部
export const getTroubleArea = () => {
  return get_(`${urlApi}/troubleShoot/getTroubleAreas?`)
}
// 排查区域--新增
export const submitTroubleArea = (params) => {
  return post_(`${urlApi}/troubleShoot/addTroubleAreas`, params)
}
//排查区域--修改
export const editTroubleArea = (params) => {
  return post_(`${urlApi}/troubleShoot/updateTroubleAreas`, params)
}
// 获取问题点--全部
export const getTroublePoint = () => {
  return get_(`${urlApi}/troubleShoot/getTroublePoint?`)
}
// 获取问题点--关键字
export const searchTroublePoint = (search) => {
  return get_(`${urlApi}/troubleShoot/getTroublePoint?search=${search}`)
}
// 获取水质点--全部
export const getCOD = () => {
  return get_(`${urlApi}/troubleShoot/getWQPoint?`)
}
// 获取水质点--关键字
export const searchCOD = (search) => {
  return get_(`${urlApi}/troubleShoot/getWQPoint?search=${search}`)
}
// 获取检测管理信息--分页
export const getJCGLInfo = (
  currentPage,
  pageSize,
  defectLevel,
  start_time_choose,
  end_time_choose
) => {
  return get_(
    `${urlApi}/detectionInfo/getDetectionInfo?pageNum=${currentPage}&pageSize=${pageSize}&defectLevels=${defectLevel}&testingStartDate=${start_time_choose}&testingEndDate=${end_time_choose}`
  )
}
// 获取检测管理信息--开关全部图层
export const getJCWhole = (testingStartDate, testingEndDate) => {
  return get_(
    `${urlApi}/detectionInfo/getCoordinate?testingStartDate=${testingStartDate}&testingEndDate=${testingEndDate}`
  )
}
// 获取检测管理信息start_time_choose, end_time_choose//testingStartDate=${start_time_choose}&testingEndDate=${end_time_choose}
export const getJCGLSearch = (start_time_choose, end_time_choose) => {
  return get_(
    `${urlApi}/detectionInfo/getDetectionInfo?testingStartDate=${start_time_choose}&testingEndDate=${end_time_choose}`
  )
}
// 检测挂探测
export const getJCTC = (featId) => {
  return get_(`${urlApi}/detectionInfo/getDetectionInfo?featId=${featId}`)
}
// 获取探测线信息(单个)
export const getPipeInfo = (featId) => {
  return get_(`${urlApi}/probeInfo/getPipelineInfo?featId=${featId}`)
}
// 获取地图底图
export const getMapInfo = () => {
  return get_(`${urlApi}/map/getMap`)
}
// 获取探测管点信息(单个)
export const getPipePointInfo = (featId) => {
  return get_(`${urlApi}/probeInfo/getPipePointInfo?featId=${featId}`)
}
// 获取修复信息--搜索全部
export const getXFInfo = () => {
  return get_(`${urlApi}/repairInfo/getRepairInfo?`)
}
// 获取修复信息--搜索单个
export const getXFSearch = (featId) => {
  return get_(`${urlApi}/repairInfo/getRepairInfo?featId=${featId}`)
}
//提交用户意见
export const submitUserComments = (params) => {
  return post_(`${urlApi}/userComments/submitUserComments`, params)
}
// 提交书签
export const submitUserMark = (params) => {
  return post_(`${urlApi}/userBookMark/insertUserBookMark`, params)
}
// 获取书签
export const getUserMark = () => {
  return get_(`${urlApi}/userBookMark/getUserBookMark`)
}
// 删除书签
export const delUserMark = (params) => {
  return post_(`${urlApi}/userBookMark/deleteUserBookMark`, params)
}
// 提交用户绘图
export const submitUserDraw = (params) => {
  return post_(`${urlApi}/userLayer/insertUserLayer`, params)
}
// 获取用户绘图
export const getUserDraw = () => {
  return get_(`${urlApi}/userLayer/getUserLayer`)
}
// 删除用户绘图
export const delUserDraw = (params) => {
  return post_(`${urlApi}/userLayer/deleteUserLayer`, params)
}
// 空间查询返回数据
export const getSpatialInfo = (params) => {
  return post_(`${urlApi}/probeInfo/getSpatialStatisticsInfo?`, params)
}
