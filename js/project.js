const slider = tns ({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.prev').addEventListener('click', () => {
  slider.goTo('prev')
});

document.querySelector('.next').addEventListener('click', () => {
  slider.goTo('next')
});

// tabs

  const tabs = document.querySelectorAll('.catalog__tab'),
        tabContent = document.querySelectorAll('.catalog__content'),
        tabsParent = document.querySelector('.catalog__tabs');


  function hideTabContent () {
      tabContent.forEach(item => {
          item.classList.remove('catalog__content_active');
      });

      tabs.forEach(tab => {
          tab.classList.remove('catalog__tab_active');
      })
  };

  function showTabContent (i = 0) {
      tabContent[i].classList.add('catalog__content_active');
      tabs[i].classList.add('catalog__tab_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if(target && target.closest('.catalog__tab')){

          tabs.forEach((item, i) => {
              if(target == item || target.parentElement == item){
                  hideTabContent();
                  showTabContent(i); 
              }
          });
      }
  });

//   modal

  const modal = document.querySelector('.modal'),
        miniModal = document.querySelector('.modal_mini'),
        modalTrigger = document.querySelectorAll('.button'),
        closeTrigger = document.querySelectorAll('.modal__close')
        overlay = document.querySelector('.overlay');

  function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';   
}

  function modalClose() {
    modal.style.display = 'none';
    miniModal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-modal')) {
          openModal();  
        }
      }) 
  });

  closeTrigger.addEventListener('click', (e) => {
        modalClose();
    });
  
    document.addEventListener('keydown', (e) => {
      if(e.code === 'Escape' && modal) {
          modalClose();
      }
  });

// form

const form = document.querySelectorAll('.feed-form'),
            inputs = document.querySelectorAll('input');
    
    // checkNumInputs('input[name="user_phone"]');
    
    const message = {
        failture: 'Something went wrong'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('js/server.php', formData)
                .then(res => {
                    console.log(res);
                    miniModal.style.display = 'block';
                    overlay.style.display = 'block';
                })
                .catch(() => statusMessage.textContent = message.failture)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        miniModal.style.display = 'none';
                        overlay.style.display = 'none';
                    }, 5000);
                })
        })
    })  

  
 