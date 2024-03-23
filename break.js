// save this as scrape_su.js
// Thanks to : https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth contributors <333
const puppeteer = require('puppeteer-extra')
const {exec, execSync} = require("child_process");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


// Add adblocker plugin to block all ads and trackers (saves bandwidth)
/*const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))*/


/**
 * @brief   This function is for scrape the content of a html page
 *          with the html content generate with js file of the target
 *          Puppetter is use for create a recever browser
 *          Now we launch the page on this special browser and the generate
 *          content is on the new page.
 * 
 *          The 'extra-plugin' is a no trace content this is why
 *          is not dectected by the no-Bot solutions like as 'DataDome' or 'Cloudflare'
 *          and it's use for bypass captcha,recaptcha etcc..
 * 
 *          In this case I have many operations to process, like click on 
 *          element list or type in an input field 
 *          
 *          And the goal is to extract JSON content (line 20) of each page
 *          for have informations of the products display on each page.
 * 
 * @param { string }  url
*/

function call_print_png(name_canva) {
	var my_exec = "libpng_usage/print_png canvas_lib/"+name_canva;
	var r = execSync(my_exec).toString();
	const rtn = r.substring(r.indexOf("= "));
	const rt = parseFloat(rtn.substring(2,rtn.indexOf("px")));
	return rt;
}
//console.log(call_print_png());

async function brk(url,name_canva_file, name_out_file) {
  // -- ERROR BOT DETECTION AFTER MANY GOOD TRY WITH THIS SEQUENCE OF INSTRUCTIONS -- //
  const browser = await puppeteer.launch({
								headless: true,
								ignoreHTTPSErrors: true,
								args: [`--window-size=800,700`],
								defaultViewport: {
									width:800,
									height:700
								}});
  const page = await browser.newPage();
  await page.goto(url);
  const url_ = await page.url();
    //--GOTO CANVAS 
	await page.waitForSelector('#puzzle');          // wait for the selector to load
	const canva = await page.$('#puzzle');        // declare a variable with an ElementHandle
  const pos_canva = await canva.boundingBox();
	await canva.screenshot({path: 'canvas_lib/'+name_canva_file}); /// take screenshot element in puppeteer
	//-- END GOTO
	//RESOLVE CAPTCHA
	//--END RESOLVE
  const piece_pos = call_print_png(name_canva_file);//res of ./print_png RETURN 
	//GOTO BUTTON TO SLIDE 
	await page.waitForSelector('#slide');          // wait for the selector to load
	const slider = await page.$('#slide');        // declare a variable with an ElementHandle
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
  await page.waitForTimeout(100)
	//await page.waitForTimeout(2000);
	await page.mouse.up();
  //await page.waitForTimeout(2000);
  await page.screenshot({ path: 'outs/'+name_out_file, fullPage: true });
  await browser.close();
}

var ls_size = parseInt(execSync("ls -l canvas_lib | wc -l").toString());
const file = ""+ls_size+".png";
brk("http://localhost/tests_htmls/sliders/slider.html",file,"screen_"+file);
// IF MANY CANVA GENERATE RANDOMLY IT'S POSSIBLE TO AUTO THE BOT 


function clean_outs_canvas() {
  exec("rm canvas_lib/* && rm outs/*")
}
