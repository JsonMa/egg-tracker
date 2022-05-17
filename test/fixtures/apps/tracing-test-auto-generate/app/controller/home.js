'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { key } = this.ctx.app.config.tracker;
    this.ctx.body = this.ctx[key];
  }
}

module.exports = HomeController;
