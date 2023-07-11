export default function searchFunction(inputId, tableId) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;

  input = inputId;
  filter = input.toUpperCase();
  tr = tableId.getElementsByTagName("tr");
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    td = tr[i];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}