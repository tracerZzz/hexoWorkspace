---
title: iterm2自定义命令
excerpt: 
  <img class="" width="100%" 
  data-original="http://og3vj3jrj.bkt.clouddn.com/20180114151593319954483.png"></br>iterm2自定义命令；
tags:
  - iterm2
categories:
- coding
p: /iterm2/iterm2自定义命令.md
date: 2018-01-14 20:19:07
---

环境：iTerm+zsh

```Bash
echo "alias alias hexod='hexo clean && hexo g && hexo d'" >> ~/.bash_profile
echo "source ~/.bash_profile" >> ~/.zshrc
```

注意双引号中的单引号



