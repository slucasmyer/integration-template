import ProTip from "./ProTip";
import Copyright from "./Copyright";
export default function Footer(props: any) {
  return (
    <footer className={`footer`}>
      <ProTip />
      <Copyright />
    </footer>
  )
}