import styles from "./CashOnDelivery.module.css";
import { GoCreditCard } from "react-icons/go";


const CreditCard = () => {
	return (
		<div className={styles.container}>
			<div>
				<GoCreditCard className={styles.truck} />
			</div>
      <small>
        pay by card
      </small>
		</div>
	);
};

export default CreditCard;
