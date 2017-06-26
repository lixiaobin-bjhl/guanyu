/**
 * @fileOverview arhat-service-product
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { get, post } from '../function/serviceUtil';

/**
 * 获取prepayid
 */
export function getPrepayId (params) {
    return post('http://127.0.0.1:7001/purchase/prepayid', params)  
}