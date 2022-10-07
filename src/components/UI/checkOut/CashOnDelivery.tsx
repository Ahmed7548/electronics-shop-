import React from "react";
import styles from "./CashOnDelivery.module.css";
import { TbTruckDelivery } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";

const CashOnDelivery = () => {
	return (
		<div className={styles.container}>
			<div>
				<TbTruckDelivery className={styles.truck} />
				<GiTakeMyMoney className={styles.money} />
			</div>
			<small>cash on delivery</small>
		</div>
	);
};

export default CashOnDelivery;
