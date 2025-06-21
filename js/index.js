// window.bgAudio = new Audio('audio/bg.mp3')

Vue.createApp({
  data() {
    return {
      flag: 1,
      bgPlay: true,
      notStart: true,
      list: window.dataList,
      message: 'Hello Vue!',
      lockInd: 0,
      currItem: null,
      currInd: 0,
      randomList: [],
      hanziShow: true,
      cardShow: false,
      gameShow: false,
      gameStep: [],
      gameType: 'listen', // listen fill stroke draw
      gameStatus: null, // init playing end
      strokeStatus: null, // [0, 1]
      drawStatus: null, // 1 - 100
      drawImg: null,
      audioBg: null
    }
  },
  created() {
    this.lockInd = getStorage('lockInd') || 0
    this.bgPlay = getStorage('bgPlay') === null ? true : getStorage('bgPlay')
    if (!this.bgPlay) this.notStart = false
  },
  mounted() {
    this.audioBg = document.getElementById('audioBg')
    loadScripts()
    document.querySelector(`#hanzi-list > .hanzi-item:nth-of-type(${this.lockInd + 1})`).scrollIntoView({ behavior: 'smooth', block: 'center' })
    document.addEventListener("visibilitychange", () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        if (this.bgPlay) this.audioBg.pause()
      } else {
        if (this.bgPlay) this.audioBg.play()
      }
    });
  },
  methods: {
    speakText: speakText,
    toggleBg() {
      this.bgPlay = !this.bgPlay
      setStorage('bgPlay', this.bgPlay)
      if (this.bgPlay) {
        this.audioBg.play()
      } else {
        this.audioBg.pause()
      }
    },
    goTop() {
      document.getElementById('hanzi-list').scrollTo({ top: 0, behavior: 'smooth'});
    },
    startApp() {
      this.notStart = false
      this.bgPlay && this.audioBg.play()
    },
    goBack(step) {
      playAudio('click')
      this.hanziShow = step == 1;
      this.cardShow = step == 2;
      this.gameShow = false;
      this.gameStatus = null
      this.strokeStatus = null
      this.drawStatus = null
      if (step == 1 && this.bgPlay) this.audioBg.play()
    },
    hanziClick(item, ind) {
      if (this.lockInd < ind) return playAudio('lock') && myAlert('小朋友请先学习前面的汉字哦~', 10);
      this.audioBg.pause()
      this.currItem = item;
      this.currInd = ind;
      this.gameStep = [];
      // 随机抽取ind周围前后20个之内的3个汉字
      let temp = window.dataList
        .filter((x, i) => i >= ind - 20 && i <= ind + 20 && x.w != item.w)
        .sort(() => Math.random() - 0.5).slice(0, 3)
      // temp随机一个位置插入currItem
      temp.splice(Math.floor(Math.random() * temp.length), 0, item)
      this.randomList = temp.map(item => ({ ...item }));
      this.hanziShow = false;
      this.cardShow = true;
      setTimeout(() => this.readItem(item), 1000)
    },
    readItem(item) {
      item = item || this.currItem;
      console.log(item);
      speakText(item.w + ', ' + item.p + '的' + item.w)
    },
    goGame(type) {
      if (this.lockInd == this.currInd && ((type === 'listen' && this.gameStep.length < 1)
        || (type === 'draw' && this.gameStep.length < 2))) return playAudio('gamelock')
      this.cardShow = false;
      this.gameType = type;
      this.gameShow = true
      this.randomList.forEach(x => x.status = '')
      setTimeout(() => {
        playAudio(`game-${type}`)
        if (type === 'stroke') {
          this.strokeStatus = null
          listHanzi(document.getElementById('stroke-list'), this.currItem.w, 46)
          aniHanzi(document.getElementById('stroke-ani'), this.currItem.w, 160)
          writeHanzi(document.getElementById('stroke-write'), this.currItem.w, 180, (_, finish, total) => {
            this.strokeStatus = [finish, total]
            if (finish === total) {
              playAudio('correct')
              playAudio('correct-stroke')
              if (!this.gameStep.includes(1)) this.gameStep.push(1)
            }
          })
        }
        if (type === 'listen') {
          setTimeout(() => speakText(this.currItem.w, 3), 2600)
        }
        if (type === 'draw') {
          setTimeout(() => speakText(this.currItem.w, 3), 3400)
          let len = 33
          // 随机一个
          this.drawImg = `./img/draw/draw${Math.floor(Math.random() * len + 1)}.webp`
          this.drawStatus = 10
        }
      }, 500)
    },
    listenClick(item) {
      this.randomList.forEach(x => x.status = '')
      if (this.gameStatus == 'correct') return
      if (item.w == this.currItem.w) {
        console.log(6666666666);
        playAudio('correct')
        playAudio('correct-listen')
        item.status = 'correct'
        this.gameStatus = 'correct'
        if (!this.gameStep.includes(2)) this.gameStep.push(2)
      } else {
        playAudio('wrong')
        item.status = 'wrong'
        this.gameStatus = 'wrong'
      }
    },
    drawClick(item) {
      this.randomList.forEach(x => x.status = '')
      console.log('drawClick..........');
      if (this.drawStatus === 100) {
        return
      }
      if (item.w == this.currItem.w) {
        playAudio('correct')
        item.status = 'correct'
        let temp = this.drawStatus + 10
        this.drawStatus = temp > 100 ? 100 : temp
        if (this.drawStatus === 100) {
          playAudio('correct-stroke')
          this.gameStatus = 'correct'
          if (!this.gameStep.includes(3)) this.gameStep.push(3)
          this.addLockInd()
        }

      } else {
        playAudio('wrong1')
        item.status = 'wrong'
        let temp = this.drawStatus - 10
        this.drawStatus = temp < 0 ? 0 : temp
      }
    },
    addLockInd() {
      this.lockInd += 1
      setStorage('lockInd', this.lockInd)
    },
    flagClick() {
      this.flag++
      if (this.flag == 10) {
        let ind = window.prompt('请输入解锁关卡')
        if (ind && ind.trim() && !isNaN(ind)) {
          setStorage('lockInd', parseInt(ind))
          location.reload()
        }
      }
    }
  },
}).mount('#app')
