import React from "react";
import "./income.css";


const AddIncome=()=>{

    return(

    <section className="content">
        <div className="expense-detail">
            <h1 style={{textAlign:'center'}}>ADD INCOME DATA</h1>
            <div className="expense-dashboard">
                <input type="text" placeholder="enter title"></input>
            </div>
            <div className="expense-dashboard">
                <input type="text" placeholder="enter description"></input>
            </div>
            <div className="expense-dashboard">
                <input type="number" placeholder="enter number"></input>
            </div>
            <div className="add-button">
                <button type="submit">Record Income</button>
            </div>
        </div>
    </section>
    )
}

export default AddIncome;