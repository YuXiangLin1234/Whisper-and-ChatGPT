import '../App.css';
import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
	// backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const ReportViewer = ({translations, chats, summary}) => {
	return (
        // <PDFViewer>
			<Document>
			<Page size="A4" style={styles.page}>
				<View  style={styles.section}>
				<Text>
					Text in PDF
				</Text>
				</View>
				<View  style={styles.section}>
				<Text>Section #2</Text>
				</View>
			</Page>
			</Document>		
		// </PDFViewer>	
	)
}

export default ReportViewer;