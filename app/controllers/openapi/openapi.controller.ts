import {
    BadRequestError,
    Post,
    JsonController,
    BodyParam,
    Get,
    Ctx,
    Req,
    QueryParams,
    Param,
    Body,
    Redirect,
    Res,
    Put,
    Delete,
    HeaderParam
} from 'routing-controllers'
import Request from "koa"
import { LiveService } from '../../services'
import { decService } from '../../services/tools/dec.service'
import { Service } from 'typedi'
import { Md5 } from 'ts-md5/dist/md5';
import * as jwt from 'jsonwebtoken';
const puppeteer = require('puppeteer');


@JsonController()
@Service()
export class OpenapiController {
    constructor(private catsService: LiveService, private decService: decService) { }
   
    @Post('openapi/accesstoken')
    async zxy_accesstoken(@Body() data: any ) {
        const secret = process.env.KEY;
        if(data.appid=="tj73325e554f56eb05" && data.appkey=="f778ae2021e0f8e98e5ac76fe00e28b0"){
            const payload = {zhiboid:data.zhiboid, eid:data.eid};
            const token = jwt.sign(payload, secret, { expiresIn:  '12h' });
            return { data: token };
        }else{
            return 'appid或者key错误'
        }
    }

    @Get('openapi/test')
    async test( ) {

       //这是爬虫框架
	const browser = await puppeteer.launch({
		//executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
		headless: false,
		slowMo: 50,
		devtools: false,
		defaultViewport: null,
	});
	const page = await browser.newPage();
	await page.goto('http://www.sasac.gov.cn/n4422011/n14158800/n14158998/c14159097/content.html', {
		timeout: 30000
	});
	// let username = await page.$('#username');
	// let password = await page.$('#password');
	// await username.type("xiongzhongbo");
	// await password.type("xiao9202127");
	// const login_btn = await page.$('.ant-btn-primary');
	// await login_btn.click()
	// await page.waitForNavigation({
	// 	waitUntil: 'networkidle2'
	// })
	// await page.goto("https://oa.pccpa.cn/pc/employee/contact", {
	// 	timeout: 3000
	// });

	// let mobile = await page.waitForSelector('#mobilePhone');
	// await mobile.type("9");
	// let search = await page.waitForSelector(
	// 	'.antd-pro-pages-emp-contact-components-inquire-box-searchConditionButton');
	// await search.click()
	// let test
	page
		.waitForSelector('.text1')
		.then(async () => {
			let searchValue = await page.$$eval('.text1 table td a', e => {
				var dd = {};
				for (var i = 0; i < e.length; i++) {
					dd[i] = e[i].innerText
				}
				return dd;
			});
			console.log(searchValue)
			// reply.send(searchValue)
		});
	// let next_btn = await page.waitForSelector('.ant-pagination-next');
	// await next_btn.click()
	// page
	// 	.waitForSelector('.ant-descriptions-item-content')
	// 	.then(async () => {
	// 		let searchValue = await page.$$eval('.ant-descriptions-item-content', e => {
	// 			var dd = {};
	// 			for (var i = 0; i < e.length; i++) {
	// 				dd[i] = e[i].innerText
	// 			}
	// 			return dd;
	// 		});
	// 		console.log(searchValue)
	// 		//reply.send(searchValue)
	// 	});
    }


    

  

}

