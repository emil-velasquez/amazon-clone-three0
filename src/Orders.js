import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { useHistory } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";

import { Database } from "@three0dev/js-sdk"
import { env } from "./env"

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // if (user) {
    //   setLoading(true);
    //   db.collection("users")
    //     .doc(user?.uid)
    //     .collection("orders")
    //     .orderBy("created", "desc")
    //     .onSnapshot((snapshot) => {
    //       setLoading(false);
    //       return setOrders(
    //         snapshot.docs.map((doc) => ({
    //           id: doc.id,
    //           data: doc.data(),
    //         }))
    //       );
    //     });
    // } else {
    //   setOrders([]);
    // }
    fetchUserOrders();
  }, [user]);

  const fetchUserOrders = async () => {
    setLoading(true);
    if (user) {
      const orderDocstore = await Database.DocStore(env.ordersDB);
      const usersOrders = orderDocstore.where((order) => order.uid === user._id);
      setOrders(
        usersOrders.map((order) => ({
          id: order.paymentId,
          data: {
            created: order.created,
            basket: order.basket,
            amount: order.amount
          }
        }))
      )
    } else {
      setOrders([]);
    }
    setLoading(false);
  }

  return (
    <div className="orders">
      {/* {!user ? history.push("/") : true} */}
      {user ? <h1>Your Orders</h1> : null}
      {user ? (
        loading ? (
          <div className="orders__loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="orders__order">
            {orders?.map((order) => (
              <Order order={order} />
            ))}
          </div>
        )
      ) : (
        <div className="order__signin">
          <p>Sign in to view your orders</p>
          <Button onClick={(e) => history.push("/login")}>Sign In</Button>
        </div>
      )}
    </div>
  );
}

export default Orders;
