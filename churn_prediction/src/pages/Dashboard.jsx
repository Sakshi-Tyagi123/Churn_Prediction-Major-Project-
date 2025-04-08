import React, { useRef } from "react";
import "../styles/Dashboard.css";
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,AreaChart,Area,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";


import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = ({ predictions }) => {
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
  
    window.scrollTo(0, 0);
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      const ratio = pdfWidth / imgWidth;
      const newHeight = imgHeight * ratio;
  
      let position = 0;
  
      // If content height is more than one page
      while (position < newHeight) {
        pdf.addImage(imgData, 'PNG', 0, position * -1, pdfWidth, newHeight);
        position += pdfHeight;
        if (position < newHeight) pdf.addPage();
      }
  
      pdf.save('churn_prediction_dashboard.pdf');
    });
  };
  

  if (!predictions || predictions.length === 0) {
    return <h2 className="text-center mt-10 text-xl text-gray-600">No Data Available</h2>;
  }

  // Data processing (can add filters, mappings, summaries, etc.)
  const churnedCount = predictions.filter(p => p.Churn === 'Yes').length;
  const notChurnedCount = predictions.length - churnedCount;
  const churnRate = ((churnedCount / predictions.length) * 100).toFixed(2);



  // Churn Prediction Data
  const churnCounts = predictions.reduce((acc, item) => {
    acc[item.Churn_Prediction === "Yes" ? "Churn" : "No Churn"] += 1;
    return acc;
  }, { Churn: 0, "No Churn": 0 });
  const churnData = Object.entries(churnCounts).map(([key, value]) => ({ name: key, count: value }));

  // Payment Method Data
  const paymentMethodCounts = predictions.reduce((acc, item) => {
    acc[item.PaymentMethod] = (acc[item.PaymentMethod] || 0) + 1;
    return acc;
  }, {});
  const paymentMethodData = Object.entries(paymentMethodCounts).map(([key, value]) => ({ name: key, count: value }));

  // Internet Service Data
  const internetServiceCounts = predictions.reduce((acc, item) => {
    acc[item.InternetService] = (acc[item.InternetService] || 0) + 1;
    return acc;
  }, {});
  const internetServiceData = Object.entries(internetServiceCounts).map(([key, value]) => ({ name: key, count: value }));

  // Contract Type Data
  const contractTypeCounts = predictions.reduce((acc, item) => {
    acc[item.Contract] = (acc[item.Contract] || 0) + 1;
    return acc;
  }, {});
  const contractTypeData = Object.entries(contractTypeCounts).map(([key, value]) => ({ name: key, count: value }));

  // Gender Distribution Data
  const genderCounts = predictions.reduce((acc, item) => {
    acc[item.gender] = (acc[item.gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderCounts).map(([key, value]) => ({ name: key, count: value }));

  // Senior Citizen Distribution Data
  const seniorCitizenCounts = predictions.reduce((acc, item) => {
    acc[item.SeniorCitizen === 1 ? "Senior Citizen" : "Not Senior Citizen"] += 1;
    return acc;
  }, { "Senior Citizen": 0, "Not Senior Citizen": 0 });
  const seniorCitizenData = Object.entries(seniorCitizenCounts).map(([key, value]) => ({ name: key, count: value }));



  const monthlyChargesBins = {
    "₹0-20": 0,
    "₹20-40": 0,
    "₹40-60": 0,
    "₹60-80": 0,
    "₹80-100": 0,
    "₹100+": 0
  };
  
  // Categorizing Monthly Charges into bins
  predictions.forEach((item) => {
    const charge = item.MonthlyCharges;
    if (charge < 20) monthlyChargesBins["₹0-20"]++;
    else if (charge < 40) monthlyChargesBins["₹20-40"]++;
    else if (charge < 60) monthlyChargesBins["₹40-60"]++;
    else if (charge < 80) monthlyChargesBins["₹60-80"]++;
    else if (charge < 100) monthlyChargesBins["₹80-100"]++;
    else monthlyChargesBins["₹100+"]++;
  });
  
  // Convert object to array for Recharts
  const formattedMonthlyChargesData = Object.entries(monthlyChargesBins).map(([key, value]) => ({
    name: key,
    count: value
  }));
  



 //Monthy charges vs churn

  const churnGroups = {
    Churn: 0,
    "No Churn": 0
  };
  
  predictions.forEach((item) => {
    if (item.Churn_Prediction === "Yes") churnGroups["Churn"] += item.MonthlyCharges;
    else churnGroups["No Churn"] += item.MonthlyCharges;
  });
  
  const churnChargesData = Object.entries(churnGroups).map(([key, value]) => ({
    name: key,
    totalCharges: value
}));


//tenure

const tenureBins = {
  "0-12": 0,
  "13-24": 0,
  "25-36": 0,
  "37-48": 0,
  "49-60": 0,
  "61-72": 0
};

// Categorizing customers based on their tenure
predictions.forEach((item) => {
  const tenure = item.tenure;
  if (tenure <= 12) tenureBins["0-12"]++;
  else if (tenure <= 24) tenureBins["13-24"]++;
  else if (tenure <= 36) tenureBins["25-36"]++;
  else if (tenure <= 48) tenureBins["37-48"]++;
  else if (tenure <= 60) tenureBins["49-60"]++;
  else tenureBins["61-72"]++;
});

// Convert object to array for Recharts
const tenureData = Object.entries(tenureBins).map(([key, value]) => ({
  name: key,
  count: value
}))




//radar chart

const serviceCategories = [
  "OnlineSecurity",
  "OnlineBackup",
  "DeviceProtection",
  "TechSupport",
  "StreamingTV",
  "StreamingMovies"
];

// Initialize counts
const serviceData = serviceCategories.map((service) => ({
  service: service.replace(/([A-Z])/g, " $1").trim(), // Format labels
  churned: 0,
  nonChurned: 0
}));

// Process Data
predictions.forEach((customer) => {
  serviceCategories.forEach((service, index) => {
    if (customer[service] === "Yes") {
      if (customer.Churn_Prediction === "Yes") {
        serviceData[index].churned += 1;
      } else {
        serviceData[index].nonChurned += 1;
      }
    }
  });
});






  return (

    





    <div id="dashboard" className="dashboard-container" >
    <button className="download-btn" onClick={handleDownloadPDF}>
      Download this Report
    </button>
    <div ref={pdfRef} >
      <h1 className="dashboard-title">Churn Prediction Results</h1>
      
      <div className="dashboard-flex-container">
      {/* Table Component */}
      <div className="dashboard-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Churn Prediction</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((item, index) => (
              <tr key={index}>
                <td>{item.customerID || "Unknown"}</td>
                <td className={item.Churn_Prediction === "Yes" ? "text-red" : "text-green"}>
                  {item.Churn_Prediction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      <div className="charts-section">

      <div className="charts-container">
      <div className="chart-card">
    <h2 className="chart-title">Churn Prediction Distribution</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={churnData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* Removed <Legend /> to completely remove the purple box */}
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
        
  <div className="chart-card">
  <h2 className="chart-title">Payment Method Distribution</h2>
  <ResponsiveContainer width="100%" height={350}>
    <PieChart>
      <Legend 
        layout="vertical" 
        align="left" 
        verticalAlign="middle" 
      />
      <Pie data={paymentMethodData} dataKey="count" nameKey="name" cx="60%" cy="50%" outerRadius={100} label>
        {paymentMethodData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>


<div className="chart-card">
  <h2 className="chart-title">Internet Service Type</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={internetServiceData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* Removed Legend component to remove label box */}
      <Bar dataKey="count" fill="#ff7300" /> 
    </BarChart>
  </ResponsiveContainer>
</div>


        <div className="chart-card">
          <h2 className="chart-title">Contract Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={contractTypeData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {contractTypeData.map((entry, index) => (
                  <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={genderData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {genderData.map((entry, index) => (
                  <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Senior Citizen Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={seniorCitizenData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {seniorCitizenData.map((entry, index) => (
                  <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      

        <div className="chart-card">
  <h2 className="chart-title">Monthly Charges Distribution</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart 
      data={formattedMonthlyChargesData} 
      barCategoryGap="20%" // Increases spacing between bars  
    >
      <XAxis 
        dataKey="name" 
        interval={0}  // Forces all labels to show  
        tick={{ fontSize: 14 }}  // Keeps text straight  
        tickMargin={15}  // Adds more spacing  
      />
      <YAxis />
      <Tooltip />
      {/* Removed <Legend /> to remove label box */}
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
</div>

<div className="chart-card">
  <h2 className="chart-title">Monthly Charges vs Churn</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={churnChargesData}>
      <XAxis dataKey="name" />
      <YAxis tickFormatter={(value) => `₹${value}`} />
      <Tooltip formatter={(value) => `₹${value}`} />
      {/* Removed <Legend /> to remove label box */}
      <Bar dataKey="totalCharges" fill="#ff7300" />
    </BarChart>
  </ResponsiveContainer>
</div>



<div className="chart-card">
  <h2 className="chart-title">Tenure Distribution</h2>
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={tenureData} barGap={5} barCategoryGap={20}> 
      <XAxis 
        dataKey="name" 
        textAnchor="middle"
        interval={0} 
        tick={{ fontSize: 12, angle: -20 }} // Slightly tilted for better readability
      />
      <YAxis />
      <Tooltip />
      {/* Removed <Legend /> to remove label box */}
      <Bar dataKey="count" fill="#0088FE" barSize={25} /> {/* Optimal bar size */}
    </BarChart>
  </ResponsiveContainer>
</div>


<div className="chart-card">
  <h2 className="chart-title">Tenure Distribution</h2>
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={tenureData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
</div>




<div  id = "radar" className="chart-card">
  <h2 className="chart-title">Service Subscription & Churn Analysis</h2>
  <ResponsiveContainer width="100%" height={500}> {/* Slightly increased height */}
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={serviceData} margin={{ left: 50, right: 50, top: 20, bottom: 40 }}>
      <PolarGrid />
      <PolarAngleAxis 
        dataKey="service" 
        tick={{ fontSize: 12, wordBreak: "break-word", width: 80 }}  // Wrap text properly
      />
      <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="left" 
        wrapperStyle={{ left: 10, fontSize: "14px" }}  // Moves legend properly
      />
      <Radar 
        name="Churned" 
        dataKey="churned" 
        stroke="#FF4C4C" 
        fill="#FF4C4C" 
        fillOpacity={0.6} 
      />
      <Radar 
        name="Non-Churned" 
        dataKey="nonChurned" 
        stroke="#4C88FF" 
        fill="#4C88FF" 
        fillOpacity={0.6} 
      />
    </RadarChart>
  </ResponsiveContainer>
</div>
</div>
</div>




     </div>
   </div>
 </div>
  )
}

export default Dashboard;
