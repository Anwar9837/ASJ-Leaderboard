// Function to compare data based on the number of courses completed
function compare(a, b) {
    if (a["# of Courses Completed"] > b["# of Courses Completed"]) {
      return -1;
    }
    if (a["# of Courses Completed"] < b["# of Courses Completed"]) {
      return 1;
    }
    return 0;
  }
  
  // Function to update the table data
  const updateData = async (filter) => {
    try {
      // Fetch data from JSON file
      const response = await fetch("data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();
  
      let total_started = 0;
  
      // Filter data based on the search input
      const filteredData = filter
        ? data.filter((el) =>
            el["Student Name"].toLowerCase().includes(filter.toLowerCase())
          )
        : data;
  
      // Sort the filtered data based on the number of courses completed
      filteredData.sort(compare);
  
      let total_reg = filteredData.length;
      let html = "";
  
      // Generate HTML for the table rows with animation
      filteredData.forEach((d, i) => {
        total_started += d["Redemption Status"] === "Yes" ? 1 : 0;
        html += `<tr class="table-row">
                  <th>${i + 1}</th>
                  <td><a href="${d["Google Cloud Skills Boost Profile URL"]}" target="_blank" style="color:black;">${d["Student Name"]}</a></td>
                  <td>${d["Redemption Status"] === "Yes" ? "✅" : "⚠️"}</td>
                  <td>${d["# of Courses Completed"]}</td>
                  <td>${d["# of Skill Badges Completed"]}</td>
                  <td>${d["# of GenAI Game Completed"]}</td>
                  <td>${d["Total Completions of both Pathways"]}</td>
              </tr>`;
      });
  
      // Update the table with the generated HTML
      const tableBody = document.getElementById("gccp_body");
      tableBody.innerHTML = html;
  
      // Update statistics or display a message
      const statsElement = document.getElementById("stats");
      statsElement.innerText = `Total Participants: ${total_reg}, Started: ${total_started}`;
  
      // Add sorting functionality (you can use a library like DataTables for more advanced sorting)
      // Example: Sort the table when a table header is clicked
      const tableHeaders = document.querySelectorAll(".table-box th");
      tableHeaders.forEach((header, index) => {
        header.addEventListener("click", () => {
          // Sort the table based on the clicked header (implement sorting logic here)
          // You can use a sorting library or implement custom sorting
          // Example: Sort alphabetically based on the name when the "Name" header is clicked
          if (index === 1) {
            filteredData.sort((a, b) =>
              a["Student Name"].localeCompare(b["Student Name"])
            );
            updateData(filter);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // Initialize the table with no filter
  updateData("");
  
  // Add event listener to the input field for dynamic filtering
  const input = document.getElementById("input");
  input.addEventListener("input", () => {
    updateData(input.value);
  });
  