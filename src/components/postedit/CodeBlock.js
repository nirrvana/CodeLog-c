import React from 'react';

export default function CodeBlock(props) {
  return (
    <pre
      style={{
        background: '#000',
        color: 'pink',
        padding: 10,
      }}
    >
      <code>{props.value}</code>
    </pre>
  );
}
