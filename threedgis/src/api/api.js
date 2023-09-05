// import request from '@/utils/request'
//液位计
export function getLiquidLevelMeter(data) {
  return request({
    url: `/liquidLevelMeter/getLiquidLevelMeter`,
    method: 'post',
    data: '',
  })
}
//流量计
export function getFlowMeter(data) {
  return request({
    url: `/flowMeter/getFlowMeter`,
    method: 'post',
    data: '',
  })
}
//水质仪
export function getWaterQualityMeter(data) {
  return request({
    url: `/waterQualityMeter/getWaterQualityMeter`,
    method: 'post',
    data: '',
  })
}
//雨量计
export function getRainfallMeter(data) {
  return request({
    url: `/rainfallMeter/getRainfallMeter`,
    method: 'post',
    data: '',
  })
}
//液位图信息
export function getLiquidLevelMeterDetail(id) {
  return request({
    url: `/liquidLevelMeter/getLiquidLevelMeter?equipID=${id}`,
    method: 'post',
    data: '',
  })
}
