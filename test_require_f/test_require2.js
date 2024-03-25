var break_js = require('../break');

// -- ADD REQUIRE MODULE
const { argv } = require('process');
const puppeteer = require('puppeteer-extra');
const {exec, execSync} = require("child_process");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());
// -- END ADD REQUIRE MODULE

//break_js.brkHelp();
//console.log(break_js.execCProg("1.png"));
break_js.Main(argv);