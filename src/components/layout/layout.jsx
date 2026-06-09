import PropTypes from "prop-types";
import { Header } from "../header";
import { Footer } from "../footer";
import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
