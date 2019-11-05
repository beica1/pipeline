/**
 * Pipeline.js of timeline
 * Created by beica on 2019/10/28
 */
import React, { useEffect } from 'react'
import './calendar.scss'
const TimeLine = () => {
  var numPre, numNow, numNext, weekDay, tYear, tMonth, tDay
  // 获取每月一号是周几
  const getWeek = (year, month) => {
    var d = new Date();
    d.setYear(year);
    d.setMonth(month - 1);
    d.setDate(1);
    //获得周几
    // var weeks = ['周天', '周1', '周2', '周3', '周4', '周5', '周6'];
    weekDay = d.getDay();
    numPre = new Date(year, month, 0).toLocaleString().split(' ')[0].split('/')[2]
    numNow = new Date(year, month + 1, 0).toLocaleString().split(' ')[0].split('/')[2]
    numNext = new Date(year, month + 2, 0).toLocaleString().split(' ')[0].split('/')[2]
  }
  const doHandleZero = (zero) => {
    var date = zero;
    if (zero.toString().length === 1) {
      date = "0" + zero;
    }
    return date;
  }
  // 获取当前年-月-日
  const getDateNow = () => {
    var myDate = new Date();
    tYear = myDate.getFullYear()
    tMonth = myDate.getMonth()
    tDay = myDate.getDate()
    tMonth = doHandleZero(tMonth + 1)
    // tDay = doHandleZero(tDay)
    getWeek(tYear, tMonth - 1)
  }
  getDateNow()
  console.log('现在几月几号', tYear, tMonth, tDay);
  console.log('上个月1号周几', weekDay);
  console.log('这个月有几天', numPre);
  console.log('上个月有几天', numNow);
  console.log('下个月有几天', numNext);
  const Pre = []
  const Now = []
  const Next = []
  const kong = []
  const renwu = [1, 2, 3, 4, 5,6,7,8,9]
  const getDatamoth = () => {
    for (let i = 1; i <= numPre; i++) {
      Pre.push(i)
    }
    for (let j = 1; j <= numNow; j++) {
      Now.push(j)

    }
    for (let k = 1; k <= numNext; k++) {
      Next.push(k)
    }
    if (weekDay === 0) {
      weekDay = 7
    }
    for (let l = 1; l < weekDay; l++) {
      kong.push(l)
    }
  }
  const Openclick = () => {
    console.log(111);
  }
  getDatamoth()
  useEffect(() => {
    const active = document.querySelector('#box-m')
    active.scrollTop = 230
  });
  return (
    <div className="calendar">
      <div className="box">
        <div className="week">
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
          <span>日</span>
        </div>
        <div className="nowTime">
          {tYear + "年" + tMonth + "月" + tDay + "日"}
        </div>
        <div className="box-month">
          <div id="box-m" className="box-m">
            {kong.map((item, i) => (
              <span key={i}>{''}</span>
            ))}
            {Pre.map((item, i) => (
              <span className='next' key={i}>{item}</span>
            ))}
            {Now.map((item, i) => (
              <span onClick={() => {
                Openclick()
              }} className={`deful ${item === tDay ? 'active' : ''}`} key={i}>
                {item}
                {item >= 5 && item <= 19 ?
                  <div className="renwu">
                    {renwu.map((item, i) => (
                      <div className="line" key={i}>{''}</div>
                    ))}
                  </div> : ''
                }
              </span>
            ))}
            {Next.map((item, i) => (
              <span className='next' key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      {/* 每日任务视图 */}

    </div>
  )
};
export default TimeLine
