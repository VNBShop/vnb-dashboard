'use client'
import DataTable, { TableColumn } from 'react-data-table-component'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'

import useHydration from '@/hooks/useHydration'

import ProductsHeader from './header'

type ListProps = {
  fullname: string
  department: 'IT' | 'Accountant' | 'HR' | 'Cloud' | 'Leader'
  phone: number
  accountNumber: number
  accountName: string
  identifyNumber: number
  address: string
}

export default function ProductTableData() {
  const { hydration } = useHydration()

  if (hydration) {
    return <p className="mt-4">Loading...</p>
  }

  const genTypeColor = {
    IT: {
      color: '#693ac7',
      backgroundColor: '#f6f5fd',
    },
    Accountant: {
      color: '#068fff',
      backgroundColor: '#edfaff',
    },
    HR: {
      color: '#ff0050',
      backgroundColor: '#ffeff2',
    },
    Cloud: {
      color: '#f63fd3',
      backgroundColor: '#fff4fd',
    },
    Leader: {
      color: '#1aafc0',
      backgroundColor: '#f1fcfb',
    },
  }
  const columns: TableColumn<ListProps>[] = [
    {
      name: 'Fullname',
      center: true,
      cell(row) {
        return row.fullname
      },
    },
    {
      name: 'Department',
      center: true,
      cell(row) {
        return (
          <div
            style={{
              color: genTypeColor[row.department]?.color,
              backgroundColor: genTypeColor[row.department]?.backgroundColor,
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: '500',
            }}
          >
            {row.department}
          </div>
        )
      },
    },
    {
      name: 'Phone',
      right: true,
      cell(row) {
        return row.phone
      },
    },
    {
      name: 'Account number',
      right: true,
      cell(row) {
        return row.accountNumber
      },
    },
    {
      name: 'Account name',
      cell(row) {
        return row.accountName
      },
    },
    {
      name: 'Identify number',
      right: true,
      cell(row) {
        return row.identifyNumber
      },
    },
    {
      name: 'Address',
      cell(row) {
        return row.address
      },
    },
    {
      name: 'Action',
      center: true,
      cell() {
        return (
          <Button variant="ghost">
            <Icon name="Ellipsis" size={20} />
          </Button>
        )
      },
    },
  ]

  return (
    <>
      <ProductsHeader />
      <section className="mt-4">
        <DataTable columns={columns as []} data={dummyData} pagination />
      </section>
    </>
  )
}

const dummyData = [
  {
    fullname: 'John Doe',
    department: 'Cloud',
    phone: 4595367314,
    accountNumber: 144231658,
    accountName: 'John Doe',
    identifyNumber: 760022258,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Cloud',
    phone: 4430728168,
    accountNumber: 941189756,
    accountName: 'John Doe',
    identifyNumber: 662093145,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'IT',
    phone: 7580216286,
    accountNumber: 135567331,
    accountName: 'John Doe',
    identifyNumber: 311991261,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Cloud',
    phone: 10838645340,
    accountNumber: 653781005,
    accountName: 'John Doe',
    identifyNumber: 778365452,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leader',
    phone: 3054903388,
    accountNumber: 936533061,
    accountName: 'John Doe',
    identifyNumber: 1025763256,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'HR',
    phone: 4630323639,
    accountNumber: 507337684,
    accountName: 'John Doe',
    identifyNumber: 112423898,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'IT',
    phone: 10405668800,
    accountNumber: 668480983,
    accountName: 'John Doe',
    identifyNumber: 1002417841,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'HR',
    phone: 3320726210,
    accountNumber: 481607075,
    accountName: 'John Doe',
    identifyNumber: 1009560763,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'IT',
    phone: 2499854555,
    accountNumber: 645123059,
    accountName: 'John Doe',
    identifyNumber: 303329515,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'IT',
    phone: 3329507205,
    accountNumber: 650037613,
    accountName: 'John Doe',
    identifyNumber: 1055007941,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Accountant',
    phone: 9564823649,
    accountNumber: 160500443,
    accountName: 'John Doe',
    identifyNumber: 1063349239,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 8655042621,
    accountNumber: 122327401,
    accountName: 'John Doe',
    identifyNumber: 917752133,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'IT',
    phone: 8961189384,
    accountNumber: 721768601,
    accountName: 'John Doe',
    identifyNumber: 536646012,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 3799445593,
    accountNumber: 663929478,
    accountName: 'John Doe',
    identifyNumber: 1071699617,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 9740224853,
    accountNumber: 372006578,
    accountName: 'John Doe',
    identifyNumber: 421625564,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Cloud',
    phone: 3294882136,
    accountNumber: 276245952,
    accountName: 'John Doe',
    identifyNumber: 272244099,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 1991340277,
    accountNumber: 265273029,
    accountName: 'John Doe',
    identifyNumber: 431029582,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'HR',
    phone: 8174304327,
    accountNumber: 742607038,
    accountName: 'John Doe',
    identifyNumber: 731566607,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Cloud',
    phone: 4929866842,
    accountNumber: 1077343614,
    accountName: 'John Doe',
    identifyNumber: 468719309,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'HR',
    phone: 2563890575,
    accountNumber: 424895160,
    accountName: 'John Doe',
    identifyNumber: 806975676,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 9904655380,
    accountNumber: 806973208,
    accountName: 'John Doe',
    identifyNumber: 126147999,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Accountant',
    phone: 7711321532,
    accountNumber: 1053639759,
    accountName: 'John Doe',
    identifyNumber: 639681891,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 5469778137,
    accountNumber: 725254382,
    accountName: 'John Doe',
    identifyNumber: 701062690,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Accountant',
    phone: 2227036456,
    accountNumber: 171302479,
    accountName: 'John Doe',
    identifyNumber: 783212237,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'HR',
    phone: 5087703387,
    accountNumber: 548961837,
    accountName: 'John Doe',
    identifyNumber: 844560556,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'IT',
    phone: 6723714134,
    accountNumber: 924800456,
    accountName: 'John Doe',
    identifyNumber: 717356166,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Accountant',
    phone: 5148654611,
    accountNumber: 863021010,
    accountName: 'John Doe',
    identifyNumber: 608193393,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'HR',
    phone: 8162892097,
    accountNumber: 552195236,
    accountName: 'John Doe',
    identifyNumber: 226282798,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Leadership',
    phone: 5637722049,
    accountNumber: 758534223,
    accountName: 'John Doe',
    identifyNumber: 1057847853,
    address: '123 Main St, City',
  },
  {
    fullname: 'John Doe',
    department: 'Cloud',
    phone: 8745170313,
    accountNumber: 595944031,
    accountName: 'John Doe',
    identifyNumber: 539605567,
    address: '123 Main St, City',
  },
]
