// Thanks to : https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth contributors <333 && puppeteer contributors <33
const puppeteer = require('puppeteer-extra');
const { argv } = require('process');
const {exec, execSync} = require("child_process");

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


/**
 * @brief  Exec the C Program which contains the coordinates of the destination
 *         of the piece destination (@see print_png.c) 
 * 
 * @param { string }  the name of the .png file which contains the canva in the 
 *                    bot detection page
*/
function call_print_png(name_canva) {
	var my_exec = "libpng_usage/print_png canvas_lib/"+name_canva;
	var r = execSync(my_exec).toString();
	const rtn = r.substring(r.indexOf("= "));
	const rt = parseFloat(rtn.substring(2,rtn.indexOf("px")));
	return rt;
}

/**
 * @brief  This function use puppeteer for manipulate/access_to the DOM elements 
 *         for resolve the puzzle/CAPTCHA in the other name the GeeTest
 *         @EXPLOIT : This CAPTCHA IS EASY TO RESOLVE (CAPTCHAv1,v2,v3,ReCaptcha less easy)
 *         @COUNTER_EXPLOIT { DD } :  DD use the server side to resolve and it's a problem because
 *                                    this tool is base on the client side resolution and the server side
 *                                    is manage by puppeteer 
 *         @OTHERS_SOLUTIONS : Python -> {Re,..} packages for patch the request problem of the server side 
 *                                        check make by DD.
 * 
 * @param { string }  url             the url 
 * @param { string }  canva_path      the id/class/xpath/tagname of the canva.png image
 * @param { string }  slider_path     the id/class/xpath/tagname of the slider (button/div)
 * @param { string }  name_canva_file the out of the screenshot of the canva.png (lib of imgs for analysis for example)
 * @param { string }  name_out file   the out of the screenshot of the result.png (lib of imgs for analysis for example)
*/
async function brk(url,canva_path,slider_path,name_canva_file, name_out_file) {
  // -- FOR THE MOMENT I'HAVE BEEN BLOCKED BUT THE PUZZLE IS RESOLVE 
  // -- POSSIBLE UPDATE TO NOT BEGIN IN THE BEGIN OF SLIDER BUT IN THE BEGIN
  // -- OF THE PIECE TO MOVE (need C algorithm update!!)
  const browser = await puppeteer.launch({
								headless: true,
								ignoreHTTPSErrors: true,
								args: [`--window-size=800,700`], // -- SEARCH IN OPTIONS FOR BYPASS DD SERVER SIDE CHECK
								defaultViewport: {
									width:800,
									height:700
								}});
  const page = await browser.newPage();
  await page.goto(url);
  const url_ = await page.url();
  console.log(url_); // check potential redirection
  const iframeElement = await page.$('iframe');
  var slider = "";
  if(iframeElement === null) { // - NO IFRAME 
    await page.screenshot({path: 'screen_deps/start.png'});
    await page.waitForTimeout(2000);
    await page.waitForSelector(canva_path);         
    const canva = await page.$(canva_path);    
    await canva.screenshot({path: 'canvas_lib/'+name_canva_file}); // take screenshot element in puppeteer
    await page.waitForSelector(slider_path);         
    slider = await page.$(slider_path);       
  }
  else {
    const frame = await iframeElement.contentFrame();
    await page.screenshot({path: 'screen_deps/start.png'});
    await frame.waitForTimeout(2000);
    await frame.waitForSelector(canva_path);         
    const canva = await frame.$(canva_path);       
    await canva.screenshot({path: 'canvas_lib/'+name_canva_file}); // take screenshot element in puppeteer
    await frame.waitForSelector(slider_path);       
    slider = await frame.$(slider_path);   
  }
  console.log(iframeElement);
	
  const piece_pos = call_print_png(name_canva_file);
	const pos_slider = await slider.boundingBox();
	await page.mouse.reset();
	let handleX = pos_slider.x + pos_slider.width / 2;
	let handleY = pos_slider.y ;//+ pos.height / 2;

	await page.mouse.move(handleX, handleY, { steps: 25} );
	await page.mouse.down();

	await page.waitForTimeout(250);
	let destX = pos_slider.x + 5 +  piece_pos; // target determine with my breaker programme on canvas.png 
	//let destY = handleY + 32;
	await page.mouse.move(destX, handleY, { steps: 25 });
	await page.waitForTimeout(100);
	await page.mouse.up();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'outs/'+name_out_file, fullPage: true });
  await browser.close();
}


/**
 * @brief   Exec the main function of this program, create a lib of canva
 *          It's a default with DataDomeBreaker *canva and slider paths*
 * 
 * @param { string } the url 
*/
function execBrk(argument) {
	var ls_size = parseInt(execSync("ls -l canvas_lib | wc -l").toString());
	const file = ""+ls_size+".png";
	/*const path_to_file = "tests_htmls/sliders/slider.html";
	const url = "http://localhost/"+path_to_file;*/
	url = argument;
	brk(url,'#captcha__puzzle','.slider',file,"screen_"+file);
}

/**
 * @brief  Clean the libs
*/
function execClean() {
  exec("rm canvas_lib/* && rm outs/*")
}

/**
 * @brief  Here you create your own code and export this code like *Line 174* of this file 
*/
function execLocally() {
	/**
	 * 
	 ************************** YOUR CODE HERE ********************************
	 * 
	*/
	return;
}

function execHelp() {
	const rtn_e = "\t\t\t -e -> execDefaultBrk \t[ARGUMENT] : {http/https}://... \n";
	const rtn_c = "\t\t\t -c -> cleanDirectories [ARGUMENT] : [NO_ARGUMENT]\n";
	const rtn_l = "\t\t\t -l -> execYourCode     [ARGUMENT] : [NO ARGUMENT]";
	console.log(rtn_e+rtn_c+rtn_l);
}


function main(argc,argv) {
	if((argc < 3) && (argc > 4)) {
		console.log("Usage : node break.js [OPTION] [ARGUMENT]");
		execHelp();
	}
	else {
		const OPTION = argv[2];
		switch(OPTION) {
			case "-e":
				console.log("execDefault");
				if(argv[3])
					execBrk(argv[3]);
				else 
					execHelp();
				break;
			case "-c":
				console.log("clean");
				execClean();
				break;
			case '-l':
				console.log("locally");
				execLocally();
				break;
			default:
				execHelp();
				break;
		}
	}
}
//main(argv.length,argv);

exports.brkHelp = function() {
	execHelp();
}

const final_target = "https://www.coursesu.com/drive/home";  // IN iframe -> see test for the origin 
const example = "http://localhost/tests_htmls/sliders/slider.html"; 
const example_iframe = "http://localhost/tests_htmls/sliders/slider_iframe.html";
const test = "https://geo.captcha-delivery.com/captcha/?initialCid=AHrlqAAAAAMA1ep92dHTDfwAW61dew%3D%3D&hash=F86E91876BC172D9F6A12DDC2B3351&cid=e3MuK~_Q2iMU2r4CJD4D9qqcnKgV3xjig~~9Eo1zj2nSuW4EFrqGwyWY0MYtfDI6rSmbCI90DTRN17C7kpS~rTOOUOwvuZPc848RYZ~86lr5ay0XFffCArK7tpSXLj_n&t=fe&referer=https%3A%2F%2Fwww.coursesu.com%2Fon%2Fdemandware.store%2FSites-DigitalU-Site%2Ffr_FR%2FHome-Show&s=44423&e=371932bc086feda8bbeb558b4984761517d10e3b9e6f0458d0ed474d043561c0"; // break ok 
//execBrk(example_iframe);