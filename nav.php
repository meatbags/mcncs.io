<?php
  $page = get_page_by_title('index');
  $content = get_field('sections', $page->ID);
  $fb = get_field('facebook_link', $page->ID);
  $insta = get_field('instagram_link', $page->ID);
  $twitter = get_field('twitter_link', $page->ID);
?>

<div class='nav hidden'>
  <div class='nav__inner'>
    <div class='menu-button'>
      <div class='menu-button__inner'>
        <img src='<?php echo get_template_directory_uri(); ?>/lib/img/logo_white_tiny.png' />
      </div>
      <!-- <div class='menu-button__inner rotate'>&#8707;</div> -->
    </div>
  </div>
</div>

<div class='menu'>
  <div class='menu__inner'>
    <div class='menu__content'>
      <div class='menu__content__inner'>
        <div class='row grid cascade'>
          <div class='grid__third'>
            <img src='<?php echo get_template_directory_uri(); ?>/lib/img/logo_white_2.png' alt='Mechanics Logo' />
          </div>
        </div>

        <?php
          foreach ($content as $block): ?>
            <div class='row cascade'>
              <div class='grid__full'>
                <?php echo $block['section_content']; ?>
              </div>
            </div>
            <?php
          endforeach;
        ?>
        <?php if ($fb || $insta || $twitter): ?>
        <div class='row grid socmed'>
          <div class='grid__50'>
            <?php if ($fb): ?>
              <a target='_blank' href='<?php echo $fb; ?>'>
                <img src='<?php echo get_template_directory_uri(); ?>/lib/img/fb.png' />
              </a>
            <?php endif;
            if ($insta): ?>
              <a target='_blank' href='<?php echo $insta; ?>'>
                <img src='<?php echo get_template_directory_uri(); ?>/lib/img/insta.png' />
              </a>
            <?php endif;
            if ($twitter): ?>
              <a target='_blank' href='<?php echo $twitter; ?>'>
                <img src='<?php echo get_template_directory_uri(); ?>/lib/img/twt.png' />
              </a>
            <?php endif; ?>
          </div>
        </div>
        <?php endif; ?>
        <div class='row'>
          <?php get_template_part('newsletter'); ?>
        </div>
      </div>
    </div>
    <!--
      <div class='menu-close'>BACK</div>
    -->
  </div>
</div>
