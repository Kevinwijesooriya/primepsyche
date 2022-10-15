import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a tickets argument
const EventReportGenerator = (events) => {
    //console.log("🚀 ~ file: reportGenerator.js ~ line 9 ~ generatePDF ~ posts", posts)

    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = [
        "Id",
        "Title",
        "Date",
        "Time",
        "Conducted by",
        "Comments"
    ];

    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    events.forEach((event) => {
        const eventData = [
            event._id,
            event.title,
            moment(event.date).format("MMM Do YY"),
            moment(event.time).format("hh : mm"),
            event.conducted_by,
            event.comments.length,
            // called date-fns to format the date on the ticket
            // format(new Date(ticket.updatedat), "yyyy-MM-dd")
        ];
        // push each tickcet's info into a row
        tableRows.push(eventData);
    });

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    // ticket title. and margin-top + margin-left
    doc.text(" Event Report", 14, 15);
    // we define the name of our PDF file.
    doc.save("_Event_Report_.pdf");
};

export default EventReportGenerator;
