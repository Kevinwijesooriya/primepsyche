import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a tickets argument
const HelpPostReportGenerator = (posts) => {
  //console.log("🚀 ~ file: reportGenerator.js ~ line 9 ~ generatePDF ~ posts", posts)

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "Name",
    "Gender",
    "Age",
    "Disorder",
    "Description",
    "Comments",
    "CreatedDate",
    "ModifiedDate",
  ];

  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  posts.forEach((post) => {
    const postData = [
      post.name,
      post.gender,
      post.age,
      post.disorder,
      post.description,
      post.suggests.length,
      moment(post.createdAt).format("MMM Do YY"),
      moment(post.updatedAt).format("MMM Do YY"),
      // called date-fns to format the date on the ticket
      //format(new Date(ticket.updatedat), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(postData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // ticket title. and margin-top + margin-left
  doc.text(" Help Post Report", 14, 15);
  // we define the name of our PDF file.
  doc.save("_Help_Post_Report_.pdf");
};

export default HelpPostReportGenerator;
