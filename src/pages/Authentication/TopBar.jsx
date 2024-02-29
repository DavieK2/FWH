import { useEffect, useState, createSlots } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '@/components/Icon';
import { ChevronLeft} from 'lucide-react';

const TopBar = ({ showSignUpLink = true}) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className='flex items-center justify-between'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <ChevronLeft color="#475467" size={17} />
                    <span className='text-grey-600 font-medium'>Back home</span>
                </Link>
                { showSignUpLink && <div className='flex gap-2'>
                                        <span className='text-gray-600'>Already have an account?</span>
                                        <Link to={'/login'}><span className='text-green-700 hover:text-green-800 font-semibold'>Login</span></Link>
                                    </div>
                }
            </div>
        </>
    );
};

export default TopBar;
