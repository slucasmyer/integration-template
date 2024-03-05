// "use client"
import Link from 'next/link'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function ProTip() {
  return (
    <p className={`text-center`}>
      <EmailOutlinedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
      <Link href="mailto:sullivan@primedeviation.com">Get in touch</Link>
    </p>
  );
}