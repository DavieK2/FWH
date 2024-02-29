import { useEffect, useState, createSlots } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronLeft, CircleDot, CheckCircle2, ChevronDown, Search, EyeOff } from 'lucide-react';

const Timeline = ({step = 0}) => {
    const dispatch = useDispatch();
    const [timeline, setTimeline] = useState(step)


    return (
        <>
            <ol className="relative hidden md:block pt-2">
                <div className='flex flex-col items-center'>
                    <li className="">
                        <span className={`flex items-center justify-center w-6 h-6 bg-[#E7F5F1] rounded-full ${timeline == 0 ? 'ring-4 ring-[#0D8A6A]/20' : ''} `} >
                            {timeline > 0 ? <CheckCircle2 color='#0D8A6A' /> : <CircleDot color='#0D8A6A' />}
                        </span>
                    </li>

                    <div className={ `${ timeline > 0 ? 'bg-[#0D8A6A]' : 'bg-[#EAECF0]' } w-[2px] h-[80px]`}></div>
                </div>
                <div className='flex flex-col items-center'>
                    <li className="">
                        <span className={`flex items-center justify-center w-6 h-6 ${timeline == 1 ? '#E7F5F1' : '#FFFFFF'} rounded-full  ${timeline == 1 ? 'ring-4 ring-[#0D8A6A]/20' : ''}`} >
                            { timeline > 1 ? <CheckCircle2 color='#0D8A6A' /> : <CircleDot color={`${timeline == 1 ? '#0D8A6A' : '#EAECF0'}`} />}
                        </span>
                    </li>
                    <div className={ `${ timeline > 1 ? 'bg-[#0D8A6A]' : 'bg-[#EAECF0]' } w-[2px] h-[80px]`}></div>
                </div>
                <div className='flex flex-col items-center'>
                    <li className="">
                        <span className={`flex items-center justify-center w-6 h-6 ${timeline == 2 ? '#E7F5F1' : '#FFFFFF'} rounded-full  ${timeline == 2 ? 'ring-4 ring-green-500/20' : ''}`} >
                            {timeline > 2 ? <CheckCircle2 color='#0D8A6A' /> : <CircleDot color={`${timeline == 2 ? '#0D8A6A' : '#EAECF0'}`} />}
                        </span>
                    </li>

                    <div className={ `${ timeline > 2 ? 'bg-[#0D8A6A]' : 'bg-[#EAECF0]' } w-[2px] h-[80px]`}></div>
                </div>
                <div className='flex flex-col items-center'>
                    <li className="">
                        <span className={`flex items-center justify-center w-6 h-6 ${timeline == 3 ? '#E7F5F1' : '#FFFFFF'} rounded-full  ${timeline == 3 ? 'ring-4 ring-green-500/20' : ''}`} >
                            {timeline > 3 ? <CheckCircle2 color='#0D8A6A' /> : <CircleDot color={`${timeline == 3 ? '#0D8A6A' : '#EAECF0'}`} />}
                        </span>
                    </li>
                </div>
            </ol>
        </>
    );
};

export default Timeline;
