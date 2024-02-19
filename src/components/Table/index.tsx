import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

interface Props {
    data: NonNullable<TableProps<DataType>['onChange']>;
    columns: TableColumnsType<DataType>;
    handleChange: () => void
}

export default function Table({data, columns, handleChange} : Props) {
    return (
        <>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
    )
      
}