'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs');
const cli = require('cli-color');
module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
    this.projectName = args[0];
  }
  initializing() {
    console.log(cli.green('【开始初始化项目...】'));
  }
  prompting() {
    const done = this.async();
    if(!this.projectName){
      const prompts = [{
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: 'default: demo-webpack-react'
      }];
      return this.prompt(prompts).then((props) => {
        this.props = props;
        done();
      });
    }else{
      done();
    }
  }
  paths(){
    this.destinationRoot();
  }
  configuring() {
    const projectName = this.projectName || this.props.projectName;
    const projectPath = process.cwd() + '/' + projectName;
    console.log(cli.green("【正在努力从github上拉取代码...】"));
    this.spawnCommandSync("git",['clone','git@github.com:wangningbo93/react-webpack.git',`${projectName}`]);
    console.log(cli.green("【√ 从github拉取代码完毕】"));
    console.log(cli.green("【正在读取package.json文件...】"));
    let defaultSettings = this.fs.readJSON( this.destinationPath(projectPath+'/package.json') );
    console.log(cli.green("【正在写入新的package.json文件...】"));
    let packageSettings = {
      name: this.projectName || this.props.projectName,
      private: true,
      version: defaultSettings.version,
      description: this.projectName || this.props.projectName,
      scripts: defaultSettings.scripts,
      repository: defaultSettings.repository,
      author: defaultSettings.author,
      devDependencies: defaultSettings.devDependencies,
      dependencies: defaultSettings.dependencies,
      homepage:defaultSettings.homepage
    };
    this.spawnCommandSync("rm",[`${projectPath}/package.json`]);
    this.fs.writeJSON(this.destinationPath(projectPath+'/package.json'), packageSettings);
    console.log(cli.green("【√ 写入package.json文件完毕】"));
  }
  writing() {
    const projectName = this.projectName || this.props.projectName;
    const projectPath = process.cwd() + '/' + projectName;

    // /if(projectName) {
      //fs.mkdirSync(`${projectName}`);

    //   console.log(projectPath);
    //   process.chdir(projectPath);
    // }
    //console.log(this.destinationPath(projectPath,"/src"));
    // this.fs.copy(
    //   this.templatePath("src"),
    //   this.destinationPath(projectPath,"/src")
    // );
    // this.fs.copy(
    //   this.templatePath(".babelrc"),
    //   this.destinationPath(projectPath,"/.babelrc")
    // );
    // this.fs.copy(
    //   this.templatePath(".gitignore"),
    //   this.destinationPath(projectPath,"/.gitignore")
    // );
    // this.fs.copy(
    //   this.templatePath("README.md"),
    //   this.destinationPath(projectPath,"/README.md")
    // );
    // this.fs.copy(
    //   this.templatePath("template.html"),
    //   this.destinationPath(projectPath,"template.html")
    // );
    // this.fs.copy(
    //   this.templatePath("webpack.config.dev.js"),
    //   this.destinationPath(projectPath,"webpack.config.dev.js")
    // );
    // this.fs.copy(
    //   this.templatePath("webpack.config.pro.js"),
    //   this.destinationPath(projectPath,"webpack.config.pro.js")
    // );
  }
  end() {
     const projectName = this.projectName || this.props.projectName;
    console.log(cli.green(`【${projectName}项目创建完成】`));
  }
};

