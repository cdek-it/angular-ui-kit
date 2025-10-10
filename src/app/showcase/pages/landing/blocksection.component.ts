import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'block-section',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section id="blocks-section" class="landing-blocks pt-8 overflow-hidden">
            <div class="section-header">PrimeBlocks</div>
            <p class="section-detail">400+ ready to copy-paste UI blocks to build spectacular applications in no time.</p>
            <div class="flex justify-center mt-4">
                <a href="https://blocks.primeng.org" target="_blank" class="font-semibold p-3 border-round flex items-center linkbox active" style="z-index: 99">
                    <span>Explore All</span>
                    <i class="pi pi-arrow-right ml-2"></i>
                </a>
            </div>
            <section class="prime-blocks blocks-animation flex justify-center items-center flex-col">
                <div class="flex">
                    <div class="prime-block flex align-self-stretch p-1">
                        <div class="block-sidebar w-1 p-3">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" alt="block logo" width="20" height="18" />
                            </div>
                            <div class="sidebar-menu mt-5">
                                <div class="bar !w-8/12 my-3"></div>
                                <div class="bar !w-9/12 my-3"></div>
                                <div class="bar !w-7/12 my-3"></div>
                                <div class="bar !w-6/12 my-3"></div>
                                <div class="bar !w-9/12 my-3"></div>
                            </div>
                        </div>
                        <div class="block-content flex-1 p-4 flex flex-col">
                            <div class="bar w-1"></div>
                            <div class="block-main mt-4 h-full flex justify-center items-center flex-col">
                                <div class="flex justify-between">
                                    <div class="block-item !w-6">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar !w-2 mt-2"></div>
                                                <div class="bar !w-4 mt-3"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item block-item-active animation-1 mx-3 !w-6">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar !w-2 mt-2"></div>
                                                <div class="bar !w-4 mt-3"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item !w-6">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar !w-2 mt-2"></div>
                                                <div class="bar !w-4 mt-3"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between mt-3">
                                    <div class="block-item !w-6">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar !w-2 mt-2"></div>
                                                <div class="bar !w-4 mt-3"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item mx-3 !w-6">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar !w-2 mt-2"></div>
                                                <div class="bar !w-4 mt-3"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item !w-6">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar !w-2 mt-2"></div>
                                                <div class="bar !w-4 mt-3"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex ml-8">
                    <div class="prime-block p-1 flex align-self-stretch flex-col">
                        <div class="block-header py-3 px-4 flex justify-between items-center">
                            <div class="logo pr-5">
                                <img width="20" height="18" src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" alt="block logo" />
                            </div>
                            <div class="flex-auto sidebar-menu flex">
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                            </div>
                            <div class="circle circle-highlight"></div>
                        </div>
                        <div class="block-content flex-1 p-4 flex flex-col">
                            <div class="bar w-1"></div>
                            <div class="block-main mt-4 h-full flex justify-center items-center flex-col">
                                <div class="flex justify-between">
                                    <div class="block-item !w-4">
                                        <div class="bar !w-2"></div>
                                        <span class="text my-2">26 %</span>
                                        <div class="box box-orange"></div>
                                    </div>
                                    <div class="block-item block-item-active animation-2 ml-3 mr-3 !w-4">
                                        <div class="bar !w-1"></div>
                                        <span class="text my-2">6 %</span>
                                        <div class="box box-pink"></div>
                                    </div>
                                    <div class="block-item mr-3 !w-4">
                                        <div class="bar !w-4"></div>
                                        <span class="text my-2">62 %</span>
                                        <div class="box box-green"></div>
                                    </div>
                                    <div class="block-item !w-4">
                                        <div class="bar !w-2"></div>
                                        <span class="text my-2">39 %</span>
                                        <div class="box box-blue"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prime-block flex align-self-stretch p-1">
                        <div class="block-sidebar p-3">
                            <div class="logo">
                                <img width="14" height="16" src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-2.svg" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-5">
                                <div class="circle my-3"></div>
                                <div class="circle my-3"></div>
                                <div class="circle my-3"></div>
                            </div>
                        </div>
                        <div class="block-sidebar-list px-4">
                            <div class="bar !w-2 my-3"></div>
                            <div class="bar !w-3 my-3"></div>
                            <div class="bar !w-2 my-3"></div>
                            <div class="bar !w-2 my-3"></div>
                            <div class="bar !w-1 my-3"></div>
                            <div class="bar !w-3 my-3"></div>
                            <div class="bar !w-3 my-3"></div>
                            <div class="bar !w-2 my-3"></div>
                        </div>
                        <div class="block-content flex-1 my-5 mx-4 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col px-2">
                                <div class="flex justify-between">
                                    <div class="block-item !w-3/12 flex justify-between flex-col">
                                        <div class="bar w-full"></div>
                                        <div class="flex items-center mt-3">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar !w-2"></div>
                                        </div>
                                        <div class="bar bar-button !w-4 mt-4"></div>
                                    </div>
                                    <div class="block-item block-item-active animation-3 mx-3 !w-3/12 flex justify-between flex-col">
                                        <div class="bar w-full"></div>
                                        <div class="flex items-center mt-3">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar !w-2"></div>
                                        </div>
                                        <div class="flex items-center mt-3">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar !w-3"></div>
                                        </div>
                                        <div class="bar bar-button !w-4 mt-4"></div>
                                    </div>
                                    <div class="block-item !w-3/12 flex justify-between flex-col">
                                        <div class="bar w-full"></div>
                                        <div class="flex items-center mt-3">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar !w-2"></div>
                                        </div>
                                        <div class="flex items-center mt-3">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar !w-2"></div>
                                        </div>
                                        <div class="flex items-center mt-3">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar !w-2"></div>
                                        </div>
                                        <div class="bar bar-button !w-4 mt-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex -mr-8">
                    <div class="prime-block flex align-self-stretch p-1">
                        <div class="block-sidebar w-1 p-3">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" width="20" height="18" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-5">
                                <div class="bar !w-8/12 my-3"></div>
                                <div class="bar !w-9/12 my-3"></div>
                                <div class="bar !w-7/12 my-3"></div>
                                <div class="bar !w-6/12 my-3"></div>
                                <div class="bar !w-9/12 my-3"></div>
                            </div>
                        </div>
                        <div class="block-content flex-1 p-4 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col">
                                <div class="bar !w-3/12 mb-3"></div>
                                <div class="bar !w-4/12 mb-5"></div>
                                <div class="flex justify-between">
                                    <div class="block-item !w-6 p-0">
                                        <div class="block-image"></div>
                                        <div class="p-2">
                                            <div>
                                                <div class="bar !w-4 my-2"></div>
                                                <div class="bar !w-2 mb-2"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item block-item-active mx-3 animation-1 !w-6 p-0">
                                        <div class="block-image"></div>
                                        <div class="p-2">
                                            <div>
                                                <div class="bar !w-4 my-2"></div>
                                                <div class="bar !w-2 mb-2"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item !w-6 p-0">
                                        <div class="block-image"></div>
                                        <div class="p-2">
                                            <div>
                                                <div class="bar !w-4 my-2"></div>
                                                <div class="bar !w-2 mb-2"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prime-block flex align-self-stretch p-1">
                        <div class="block-sidebar p-3">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-2.svg" width="14" height="16" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-5">
                                <div class="circle my-3"></div>
                                <div class="circle my-3"></div>
                                <div class="circle my-3"></div>
                            </div>
                        </div>
                        <div class="block-sidebar-list px-4">
                            <div class="bar !w-2 my-3"></div>
                            <div class="bar !w-3 my-3"></div>
                            <div class="bar !w-2 my-3"></div>
                            <div class="bar !w-2 my-3"></div>
                            <div class="bar !w-1 my-3"></div>
                            <div class="bar !w-3 my-3"></div>
                            <div class="bar !w-3 my-3"></div>
                            <div class="bar !w-2 my-3"></div>
                        </div>
                        <div class="block-content flex-1 my-5 mx-4 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col px-2">
                                <div class="flex justify-between">
                                    <div class="block-item block-item-table block-item-active animation-1 flex">
                                        <div class="bar !w-3 mx-3"></div>
                                        <div class="bar !w-3 mx-3"></div>
                                        <div class="bar !w-3 mx-3"></div>
                                        <div class="bar !w-3 mx-3"></div>
                                    </div>
                                </div>
                                <div class="block-item block-item-col flex">
                                    <div class="flex">
                                        <div class="circle circle-small circle-highlight -mr-1"></div>
                                        <div class="bar !w-3 mx-3"></div>
                                    </div>
                                    <div class="bar !w-3 mx-3"></div>
                                    <div class="bar !w-3 mx-3"></div>
                                    <div class="bar !w-3 mx-3"></div>
                                </div>
                                <div class="block-item block-item-col flex">
                                    <div class="flex">
                                        <div class="circle circle-small circle-highlight -mr-1"></div>
                                        <div class="bar !w-3 mx-3"></div>
                                    </div>
                                    <div class="bar !w-3 mx-3"></div>
                                    <div class="bar !w-3 mx-3"></div>
                                    <div class="bar !w-3 mx-3"></div>
                                </div>
                                <div class="block-item block-item-col flex">
                                    <div class="flex">
                                        <div class="circle circle-small circle-highlight -mr-1"></div>
                                        <div class="bar !w-3 mx-3"></div>
                                    </div>
                                    <div class="bar !w-3 mx-3"></div>
                                    <div class="bar !w-3 mx-3"></div>
                                    <div class="bar !w-3 mx-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="prime-block p-1 flex align-self-stretch flex-col">
                        <div class="block-header py-3 px-4 flex justify-between items-center">
                            <div class="logo pr-5">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" width="20" height="18" alt="block logo" />
                            </div>
                            <div class="flex-auto sidebar-menu flex">
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                                <div class="bar !w-2 mx-2"></div>
                            </div>
                            <div class="circle"></div>
                        </div>
                        <div class="block-content flex-1 p-4 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col">
                                <div class="block-item block-item-active animation-2 mx-3 !w-8 text-center flex flex-col items-center overflow-visible">
                                    <div class="-mt-4">
                                        <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/question.svg" width="24" height="24" alt="question mark" />
                                    </div>
                                    <div class="bar !w-2 mt-2"></div>
                                    <div class="bar !w-6 mt-2"></div>
                                    <div class="bar !w-4 mt-2"></div>
                                    <div class="flex">
                                        <div class="bar bar-highlight bar-button !w-4 mr-2 mt-4"></div>
                                        <div class="bar bar-button !w-4 mr-2 mt-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    `
})
export class BlockSectionComponent {}
