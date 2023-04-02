
'use client';
interface Props {
    children: React.ReactNode
  }
const SectionTitle = ({ children }: Props) => {

    return (
        <>
        <div className="main-title">
            {children}
            <div className="divider">
                <div className="zigzag large clearfix" data-svg-drawing="yes">
                    <svg xmlSpace="preserve" viewBox="0 0 69.172 14.975" width="37" height="28" y="0px" x="0px"
                        xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <path d="M1.357,12.26 10.807,2.81 20.328,12.332 29.781,2.879 39.223,12.321 48.754,2.79 58.286,12.321 67.815,2.793 "
                            strokeDasharray={"93.9851,93.9851"}
                            strokeDashoffset={0} />
                    </svg>
                </div>
            </div>
            </div>
        </>
    );
}

export default SectionTitle;