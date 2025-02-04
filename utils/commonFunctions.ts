import dayjs from "dayjs";  // package

export const convertDateFormat = (dateTimeString: string) => {
  const dateOnly = dateTimeString.split(" ")[0];
  const [year, month, day] = dateOnly.split("-");
  return `${day}-${month}-${year}`;
};
export const getFileExtrension = (filename: any) => {
  //typescrpitchanges
  if (filename) {
    return filename.split(".").pop().toLowerCase();
  }
  return "";
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
export const parseHTMLString = (htmlString: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = htmlString.match(urlRegex);

  if (!matches) {
    return htmlString; // No URLs found, return the original string
  }

  const uniqueMatches = [...new Set(matches)]; // Remove duplicate URLs
  let parsedString = htmlString;

  uniqueMatches.forEach(url => {
    const anchorTag = '<a href="' + url + '">' + url + "</a>";
    parsedString = parsedString.replace(url, anchorTag);
  });

  return parsedString;
};

export const convertCamelToNormal = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const convertSelectedArrayToString = (arr: any, key = "value") => {
  const newarr = Array.isArray(arr) ? arr.map(v => v[key]) : [];
  return newarr.length > 0 ? newarr.join(",") : "";
};

export const sumArrayofObj = (arr: any, key: string, formatValue?: (val: number) => string | number) => {
  const totalValue = arr.reduce((total: number, object: any) => {
    return total + Number(object[key]);
  }, 0);
  return formatValue ? formatValue(totalValue) : Math.round(totalValue).toLocaleString();
};

export const sumArrayofObjFixedTwo = (arr: any, key: string) => {
  return arr
    .reduce((total: number, object: any) => {
      return total + Number(object[key]);
    }, 0)
    .toFixed(2);
};

export const getCurrentDateDDMMYYYY = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
};

export const getCurrentDateProjectSummaryFormat = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd: any = today.getDate();
  const formattedToday = `${dd}${getDaySuffix(dd)} ${monthNames[today.getMonth()]}, ${yyyy}`;
  return formattedToday;
};

const getDaySuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const arrSort = (arr: any) => {
  arr.sort((a: any, b: any) => a - b);
  return arr;
};

export const checkAllZeros = (arr: number[]) => {
  const filterArr = arr.filter(v => v <= 0);
  return filterArr.length === arr.length ? [] : arr;
};

export const convertDateFormatMMM = (dateTimeString: any) => {
  const parsedDate = dayjs(dateTimeString);
  if (!parsedDate.isValid()) return "";
  const formattedDate = parsedDate.format("DD-MMM-YYYY");
  return formattedDate;
};

export const getCurrentDate = () => {
  const today: Date = new Date();
  const yyyy: number = today.getFullYear();
  let mm: number | string = today.getMonth() + 1; // Months start at 0!
  let dd: number | string = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = `${dd}/${mm}/${yyyy}`;
  return formattedToday;
};

export const getMonthName = (monthNumber: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (monthNumber >= 1 && monthNumber <= 12) {
    const monthName = months[monthNumber - 1];
    return monthName;
  } else {
    return "NA";
  }
};

export const sumAllValuesofObjExceptFirstKey = (myObject: { [obj: string]: number }) => {
  const { [Object.keys(myObject)[0]]: _, ...rest } = myObject;
  return Math.round(
    Object.values(rest).reduce((total: number, val: number) => {
      return total + val;
    }, 0),
  ).toLocaleString();
};

export const getMonthsBetweenDates = (
  startDateString: string,
  endDateString: string,
  frequency = "monthly", // Options: 'monthly', 'quarterly', 'half-yearly', 'yearly'
) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const result: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const monthYearString = currentDate
      .toLocaleString("en-US", { month: "short", year: "2-digit" })
      .split(" ")
      .map((part, index) => (index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part))
      .join(" ");
    result.push(monthYearString);

    // Move to the next month based on frequency
    if (frequency === "quarterly") {
      currentDate.setMonth(currentDate.getMonth() + 3);
    } else if (frequency === "half-yearly") {
      currentDate.setMonth(currentDate.getMonth() + 6);
    } else if (frequency === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1); // Default to monthly
    }

    currentDate.setDate(1);
  }

  return result;
};

export const isMonthKey = (key: string) => {
  return key.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}/);
};

export const sortByKeyAZ = (array: any[], key: string) => {
  return array.sort((a, b) => a[key].localeCompare(b[key]));
};

export const sortByKeyZA = (array: any[], key: string) => {
  return array.sort((a, b) => b[key].localeCompare(a[key]));
};

export const revertCommaSeperatedNumber = (value: string) => {
  return Number(String(value).replace(/[^0-9.-]/g, ""));
};

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const numberToWords = (number: number) => {
  if (number === 0) return "zero";

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (number < 20) {
    return ones[number];
  }

  if (number < 100) {
    return tens[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + ones[number % 10] : "");
  }

  if (number < 1000) {
    return ones[Math.floor(number / 100)] + " hundred" + (number % 100 !== 0 ? " and " + numberToWords(number % 100) : "");
  }

  if (number < 1000000) {
    return numberToWords(Math.floor(number / 1000)) + " thousand" + (number % 1000 !== 0 ? " " + numberToWords(number % 1000) : "");
  }

  if (number < 1000000000) {
    return numberToWords(Math.floor(number / 1000000)) + " million" + (number % 1000000 !== 0 ? " " + numberToWords(number % 1000000) : "");
  }

  if (number < 1000000000000) {
    return numberToWords(Math.floor(number / 1000000000)) + " billion" + (number % 1000000000 !== 0 ? " " + numberToWords(number % 1000000000) : "");
  }

  if (number < 1000000000000000) {
    return numberToWords(Math.floor(number / 1000000000000)) + " trillion" + (number % 1000000000000 !== 0 ? " " + numberToWords(number % 1000000000000) : "");
  }

  // if the number is beyond trillion, return the number as is
  return number.toString();
};

export const mime_types = {
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  svg: "image/svg+xml",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  autocad: ".dwg",
  csv: "text/csv",
  zip: "application/x-zip-compressed",
};
