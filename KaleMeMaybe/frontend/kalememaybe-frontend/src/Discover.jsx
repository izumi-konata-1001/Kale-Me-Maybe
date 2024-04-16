import React, { useEffect, useState } from 'react';

const Discover = () => {
  const [items, setItems] = useState([]); // 使用数组来存储后端发来的数据

  useEffect(() => {
    // 获取后端数据
    fetch('http://localhost:3000/discover')
      .then(response => response.json()) // 解析JSON格式的响应体
      .then(data => {
        setItems(data); // 设置状态为接收到的数组
      })
      .catch(err => console.error('Error fetching data: ', err));
  }, []); // 空数组确保只在组件挂载时运行

  return (
    <div>
      {items.map((item, index) => (
        <p key={index}>{item.name}</p> // 显示每一个数组元素
      ))}
    </div>
  );
};

export default Discover;
