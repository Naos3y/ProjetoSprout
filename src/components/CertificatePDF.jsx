import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    alignSelf: "center",
  },
  companyName: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#48BB78",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  signature: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
  },
});

const CertificatePDF = ({ userName, trainingName, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image
          style={styles.logo}
          src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"
        />
        <Text style={styles.companyName}>Sprout</Text>
        <Text style={styles.title}>Training Certificate</Text>
        <Text style={styles.text}>
          This certifies that {userName} has successfully completed the training
        </Text>
        <Text style={styles.text}>
          {trainingName} on {date}.
        </Text>
        <Text style={styles.signature}>______________________________</Text>
        <Text style={styles.signature}>Authorized Signature</Text>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
