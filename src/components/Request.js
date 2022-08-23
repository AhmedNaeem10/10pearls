import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Requests() {
    const dispatch = useDispatch()
    const requests = useSelector((state) => state.allRequests)
    console.log(requests);

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">User</th>
                        <th scope="col">Worker</th>
                        <th scope="col">Status</th>

                    </tr>
                </thead>
                {requests.map((requests) => {
                    const { id, worker, user, status } = requests
                    return (


                        <tbody>
                            <tr>
                                <td>{id}</td>
                                <Link style={{ "textDecoration": "none" }} to={`/worker/${worker}`}><th scope="row">{worker}</th></Link>
                                <td>{worker}</td>
                                <td>{status}</td>

                                <td class="text-end">
                                    <a href="#" type="button" class="btn btn-light btn-small"><i
                                        class="bi bi-eye"
                                    ></i>
                                        Accept</a>
                                    <a href="#" type="button" class="btn btn-light btn-small"><i
                                        class="bi bi-pencil"
                                    ></i>
                                        Decline</a>

                                </td>
                            </tr>

                        </tbody>

                    )
                })}
            </table>
        </div>
    )
}
