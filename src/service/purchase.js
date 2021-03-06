/**
 * @fileOverview arhat-product-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { get, post } from '../function/serviceUtil';

/**
 * 获取prepayid
 * 
 * @return {Promise}
 */
export function getPrepayId (params = {} ) {
    return post('/purchase/prepayid', params)  
}