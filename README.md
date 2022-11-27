# js-crawler-angel-numbers

嘗試使用 Puppeteer 來理解與實作網路爬蟲

# Docker 啟用方式

由於我們是要從容器內部連外部（本地）的服務，所以需要做一點處理

1. 在 Terminal 開啟一個 debugger chrome webSocket 接口
   `sudo /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222`
2. 開啟 docker-compose.yml，直接填入 node 指令，啟動容器的同時直接下 bash 指令
   `command: node main.js`
3. 另開一個 new terminal tab，啟動容器
   `docker-compose up`

## 參考資料

- [天使數字 Angel Number](https://angelnumber.net/)
- [ANGEL NUMBERS - Joanne Sacred Scribes (英文)](http://sacredscribesangelnumbers.blogspot.com/p/index-numbers.html)
