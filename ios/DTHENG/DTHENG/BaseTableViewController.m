#import "BaseTableViewController.h"

// author : Daniel Thengvall

@interface BaseTableViewController ()

@end

@implementation BaseTableViewController

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];

}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
    
    UIImageView *profile = (UIImageView *)[cell viewWithTag:1];
    profile.image = [UIImage imageNamed:@"profile"];
    return cell;
}

@end
