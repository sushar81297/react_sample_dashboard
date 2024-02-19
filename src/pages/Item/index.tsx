import * as XLSX from "xlsx";

import { ChangeEvent, FormEvent, useState } from "react";

import { AnyObject } from "antd/es/_util/type";
import ButtonBox from "@components/ButtonBox";
import { Table } from "antd";

type Arr = {
  [key: string]: string;
};

export default function Item() {
  const [file, setFile] = useState<File | undefined>();
  const [array, setArray] = useState<Arr[]>([]);
  const [header, setHeader] = useState<string[]>([]);

  const fileReader = new FileReader();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: AnyObject) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const header = (excelData[0] || []) as string[];
      const data = excelData.slice(1).map((row, index) => {
        const obj: Arr = {};
        const arrlist = row as [];
        arrlist.forEach((cell: string, i: number) => {
          obj[header[i] || `Column${i + 1}`] = cell;
        });
        obj.key = index.toString();
        return obj;
      });

      setHeader(header as string[]);
      setArray(data);
    };

    reader.readAsBinaryString(file);
  };

  const csvFileToArray = (string: string): void => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    setHeader(csvHeader);
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const newArray = csvRows.map((i, index) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {} as Arr);
      obj.key = index.toString();
      return obj;
    });

    setArray(newArray as Arr[]);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension === "csv") {
        fileReader.onload = function (event) {
          if (event.target && event.target.result) {
            const text = event.target.result.toString();
            csvFileToArray(text);
          }
        };

        fileReader.readAsText(file);
      } else if (extension === "xls" || extension === "xlsx") {
        readExcel(file);
      } else {
        console.error("Unsupported file format");
      }
    }
  };

  const columns = header.map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }));

  const handleDownload = (type: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(array);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, `movie.${type}`, { compression: true });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV/XLS IMPORT EXAMPLE</h1>
      <ButtonBox
        text="Excel Download"
        styleClass="btn-green"
        handleBtn={() => {
          handleDownload("xlsx");
        }}
      />
      <ButtonBox
        text="Csv Download"
        styleClass="btn-green"
        handleBtn={() => {
          handleDownload("csv");
        }}
      />
      <form>
        <input type={"file"} id={"fileInput"} onChange={handleOnChange} />

        <ButtonBox
          text=" IMPORT FILE"
          styleClass="btn-green"
          handleBtn={(e) => {
            handleOnSubmit(e);
          }}
        />
      </form>
      <br />
      <Table dataSource={array} columns={columns} />
    </div>
  );
}
