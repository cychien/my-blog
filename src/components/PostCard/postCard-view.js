import React from 'react'
import Image from 'gatsby-image'
import { Card } from 'semantic-ui-react'
import Label from '../../components/Label'
import cx from 'classnames'
import './postCard.scss'

function postCardView(props) {
  const {
    title,
    date,
    author,
    cover,
    readingTime,
    tag,
    intro,
    isCoverLeft,
    isRaised,
  } = props
  return (
    <Card
      fluid
      link
      raised={isRaised}
      className={cx({
        'post-card--horizontal': isCoverLeft,
        'post-card': !isCoverLeft,
      })}
    >
      <Image fluid={cover} className="post-card__image" />
      <Card.Content className="post-card__text">
        <Card.Header className="post-card__header">{title}</Card.Header>
        <Card.Description className="post-card__description">
          {intro}
        </Card.Description>
        <Card.Meta className="post-card__tag">
          {tag.map((item, index) => (
            <Label key={index} type={item} />
          ))}
        </Card.Meta>
        <Card.Meta className="post-card__reading-time">
          {readingTime} 分鐘閱讀
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default postCardView
