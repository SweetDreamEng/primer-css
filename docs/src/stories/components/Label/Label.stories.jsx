import React from 'react'
import clsx from 'clsx'

export default {
  title: 'Components/Label/Label',
  excludeStories: ['LabelTemplate'],
  argTypes: {
    inline: {
      control: {type: 'boolean'},
      description: 'Display label inline',
      table: {
        category: 'CSS'
      }
    },
    variant: {
      options: [0, 1, 2, 3, 4, 5], // iterator
      mapping: [
        '',
        'Label--primary',
        'Label--secondary',
        'Label--info',
        'Label--success',
        'Label--warning',
        'Label--danger'
      ], // values
      control: {
        type: 'select',
        labels: ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger']
      },
      description: 'Colors',
      table: {
        category: 'HTML'
      }
    },
    size: {
      options: [0, 1], // iterator
      mapping: ['', 'Label--large'], // values
      control: {
        type: 'select',
        labels: ['default', 'large'] // public labels
      },
      description: 'Colors',
      table: {
        category: 'CSS'
      }
    },
    text: {
      name: 'text',
      type: 'string',
      description: 'Label text',
      table: {
        category: 'HTML'
      }
    }
  }
}

export const LabelTemplate = ({inline, variant, size, text}) => (
  <span className={clsx('Label', variant && `${variant}`, size && `${size}`, inline && 'Label--inline')}>{text}</span>
)

export const Playground = LabelTemplate.bind({})
Playground.args = {
  text: 'Label text',
  inline: false,
  variant: 'Label--primary'
}
