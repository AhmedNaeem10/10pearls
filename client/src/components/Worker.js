import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectedWorker } from '../redux/actions/workerActions'
import '../App.css'
import Navbar from './Navbar'
export default function Worker() {
    const response = [
        {
            "WORKER_ID": 1,
            "FIRST_NAME": "noieji",
            "LAST_NAME": "irnvoervno",
            "PHONE": "033323432134",
            "DOB": "13-23-9000",
            "CNIC": "42324423224314",
            "WORKER_IMAGE": "ornognrogir",
            "ADDRESS": "fiuehroiferire",
            "EMAIL": "jhnrhueie@gmail.com",
            "AVAILABLE": true
        }
    ]
    const workers = useSelector((state) => state.allWorkers.workers)
    console.log(workers);
    const dispatch = useDispatch()
    const { workerId } = useParams()
    const fetchWorker = () => {
        dispatch(selectedWorker(response))
        console.log(workers);


    }
    // console.log(workers);


    useEffect(() => {
        fetchWorker()
    }, [])
    return (
        <>
            <Navbar />
            <div className="ui grid container">
                {Object.keys(workers).length === 0 ? (
                    <div>...Loading</div>
                ) : (workers.map((workers) => {
                    const { WORKER_ID, FIRST_NAME, LAST_NAME, PHONE, DOB, CNIC, WORKER_IMAGE, ADDRESS, EMAIL, AVAILABLE } = workers
                    return (<div className="ui placeholder segment">
                        <div className="ui two column stackable center aligned grid">
                            <div className="ui vertical divider">AND</div>
                            <div className="middle aligned row">
                                <div className="column lp">
                                    <img className="ui fluid image" src={WORKER_IMAGE} />
                                </div>
                                <div className="column rp">
                                    <h1>{FIRST_NAME}</h1>
                                    <h2>
                                        <a className="ui teal tag label">${PHONE}</a>
                                    </h2>
                                    <h3 className="ui brown block header">{EMAIL}</h3>
                                    <p>{ADDRESS}</p>
                                    <div className="ui vertical animated button" tabIndex="0">
                                        <div className="hidden content">
                                            <i className="shop icon"></i>
                                        </div>
                                        <div className="visible content">REQUEST</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })

                )}
            </div>
        </>

    )
}
