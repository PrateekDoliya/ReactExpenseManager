import React, { useState } from "react";

const ExpenseManager = () => {

    const [arrayData, setArrayData] = useState ([]);
    const [isEditItem, setIsEditItem] = useState (null)
    const [toggleBtn, setToggleBtn] = useState (true)
    const [inputData, setInputData] = useState ( {
        type:'',
        name:'',
        curr:'',
        friend:'',
        date:'',
        amt:'',
    } )

    const inputEvent = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }

    const addItem = () => {
        if(toggleBtn) {
            let newInputData = {
                id: new Date().getTime().toLocaleString(),
                ...inputData
            }
            setArrayData([...arrayData, newInputData]);
            setInputData({
                type:'',
                name:'',
                curr:'',
                friend:'',
                date:'',
                amt:'',
            })
        } else {
            setArrayData(
                arrayData.map( (elem) => {
                    if(elem.id === isEditItem)    
                        return {id:isEditItem,...inputData}  
                    
                    return elem;
                })
            )
            setToggleBtn(true);
            setInputData({
                type:'',
                name:'',
                curr:'',
                friend:'',
                date:'',
                amt:'',
            })
        }
    }

    const deleteItem = (id) => {
        let newData = arrayData.filter( (elem) => {
            return elem.id !== id
        })

        setArrayData(newData)
    }

    const editItem = (data) => {
        // let newEditItem = arrayData.find( (elem) => {
        //     return elem.id === data.id
        // })
        // console.log(newEditItem)
        setIsEditItem(data.id);
        setInputData(data);
        setToggleBtn(false)
        // setArrayData(
        //     arrayData.map( (elem) => {
        //         if(elem.id === isEditItem)
        //         {
        //             return {...elem, inputData}
        //         }

        //         return elem;
        //     })
        // )
    }

    return(
        <>
        <div className="container ">
            <h1 className="text-center">Simple Expense Manager Project</h1>
            <div className="bg-secondary row p-3">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label className="text-light">Type</label>
                        {/* <input type="text" name="type" value={inputData.type} onChange={inputEvent} className="form-control" /> */}
                        <select 
                            value={inputData.type} 
                            onChange={inputEvent} 
                            name="type"
                            // placeholder="Please Select the Type" 
                            className="form-control">
                            <option > --choose one</option>
                            <option value="Cash"> CASH </option>
                            <option value="Upi"> UPI</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-light">Name</label>
                        <input type="text" name="name" value={inputData.name} onChange={inputEvent}
                        className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-light">Currency</label>
                        {/* <input type="number" name="curr" value={inputData.curr} onChange={inputEvent}
                        className="form-control" /> */}
                        <select
                            name="curr"
                            value={inputData.curr}
                            onChange={inputEvent} 
                            className="form-control">
                                <option > --choose one</option>
                                <option value="USD"> USD </option>
                                <option value="RS"> RS </option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                <div className="form-group mb-3">
                        <label className="text-light">Add Friend </label>
                        <input type="text" name="friend" value={inputData.friend} onChange={inputEvent}
                        className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-light">Date</label>
                        <input type="date" name="date" value={inputData.date} onChange={inputEvent}
                        className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-light">Amount</label>
                        <input type="number" name="amt" value={inputData.amt} onChange={inputEvent}
                        className="form-control" />
                    </div>
                </div>
                <div className="text-center">
                <button className="btn btn-outline-light px-5" onClick={ addItem }> 
                    {
                        toggleBtn ? <span> Add A New Expense </span> : <span> Update A Expences </span>
                    }
                </button>
                </div>
            </div>
        </div>

        <div className="bg-light container-fluid">
            <table className="table table-bordered table-hover text-center table-responsive table-responsive-sm">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Friend</th>
                        <th>Date</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayData.map( (elem) => {
                            return(
                                <tr key={elem.id}>
                                    <td>{elem.type}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.friend}</td>
                                    <td>{elem.date}</td>
                                    <td>{elem.curr}</td>
                                    <td>{elem.amt}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={ () => {editItem(elem)}}> Edit </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={ () => deleteItem(elem.id) }> Delete </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </> 
    )
}

export default ExpenseManager;