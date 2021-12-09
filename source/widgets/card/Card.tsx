import React from 'react';
import styles from './Card.module.scss';

interface ICardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export const Card = ({ title, content, icon }: ICardProps) => (
  <div className={styles.card}>
    {icon && <div className={styles.icon}>{icon}</div>}
    <div className={styles.meta}>
      <div className={styles.title}>{title}</div>
      <div data-testid={title} className={styles.content}>
        {content}
      </div>
    </div>
  </div>
);
