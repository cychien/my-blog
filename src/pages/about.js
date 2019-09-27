import React from 'react'
import MainLayout from '../layouts/MainLayout'
import './about.scss'

function About() {
  return (
    <MainLayout>
      <div className="about__wrapper">
        <p>
          <strong>Hi 我是 Justin</strong>
        </p>
        <p>
          目前就讀於台大資訊管理研究所，平時熱愛寫網頁、閱讀以及碰觸與創新相關的人事物
        </p>
        <p>
          <strong>我的Blog有哪些文章呢？</strong>
        </p>
        <p>
          <strong>1. 人生建議</strong>
          <br />
          <span>
            這是我一直很想分享的主題，也是促使我開始Blogging的主因。生活中常有許多書籍、文章、影片給予了我極大的啟發，而這些啟發也正一步步地改變我的人生軌跡，因此特別想分享這些生命中的領悟，期許這些mindset也能幫助到大家
          </span>
        </p>
        <p>
          <strong>2. 生產力</strong>
          <br />
          <span>
            生產力一直是我十分感興趣的主題，每每看到能提升效率的Tips總會讓我的眼睛為之一亮，希望這些Tips也能讓你的眼睛為之一亮
          </span>
        </p>
        <p>
          <strong>3. 網頁開發</strong>
          <br />
          <span>
            寫網頁是促使我不斷在學習Coding這條路上披荊斬棘的動力，這裡會記錄下我在網頁開發世界中探索的足跡
          </span>
        </p>
      </div>
    </MainLayout>
  )
}

export default About
