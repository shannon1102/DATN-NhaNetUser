import React from 'react'
import Category from './Category'

export default function Categories() {
  return (
    <div className="categoriesContainer">
    <div className="categoriesContainer__title">
        <h2>Khám phá danh mục:</h2>
    </div>
    <div className="categoriesContainer__categories">
        <Category name={"Nhà trọ"}>
        </Category>
        <Category name={"Nhà ở"}>
        </Category>
        <Category name={"Chung cư"}>
        </Category>
        <Category name={"Homestay"}>
        </Category>
        <Category name={"Biệt thự"}>
        </Category>
        <Category name={"Sinh viên"}>
        </Category>
    </div>
    </div>
   
  )
}
